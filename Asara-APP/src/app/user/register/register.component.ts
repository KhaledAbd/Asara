import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractFormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/guards/mustMatch';
import { Role } from 'src/models/role';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { RoleService } from 'src/service/role.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  user: User;
  roles: Role[];
  constructor(private Auth: AuthService, private formBuilder: FormBuilder, private router: Router,
              private roleService: RoleService, private alertify: AlertifyService) {
    this.roleService.loadRoles().subscribe(d => {
      this.roles = d;
    }, e => {
      console.log(e);
    });
  }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      telephone: new FormControl('', [Validators.required,  Validators.pattern('^[0][1][0152]{1}[0-9]*') ,
                                      Validators.minLength(9), Validators.maxLength(11)]),
      username: ['', [Validators.minLength(4), Validators.maxLength(8), Validators.required, Validators.pattern('^(?=.{4,8}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      passwordConfirm: ['', [Validators.required]],
    }, { validators: MustMatch('password', 'passwordConfirm') });
  }
  mustEqual(f: FormGroup) {
    return f.get('password').value === f.get('passwordConfirm').value ? null : f.setErrors({ mismutch: true });
  }
  get f() {
    return this.registerform.controls;
  }
  register() {
    if (this.registerform.valid) {
      this.Auth.register(this.registerform.value).subscribe(d => {
        if (d){
          this.alertify.success('تم تسجيل المستخدم');
          this.registerform.reset();
        }
      }, error => {
        console.log(error);
      });
    }
  }
  isExist(){
    const username: string = this.registerform.get('username').value || null;
    if (username){
      this.Auth.isExist({username}).subscribe(d => {
        if (d.isExist){
          this.registerform.get('username').setErrors({isExist: true});
        }
      }, e => {
        console.log(e);
      });
    }
  }
}


