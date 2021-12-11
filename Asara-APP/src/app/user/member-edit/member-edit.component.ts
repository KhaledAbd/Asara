import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user';
import { UserService } from 'src/service/user.service';
import { AuthService } from 'src/service/auth.service';
import { MustMatch } from 'src/guards/mustMatch';
import { AlertifyService } from 'src/service/alterify.service';
import * as moment from 'moment';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  editUserform: FormGroup;
  formchangePassword: FormGroup;
  open = false;
  dateString: string;
  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService,
              private formBuilder: FormBuilder, private alertify: AlertifyService ) {
                this.route.data.subscribe(data => {
                  this.user = data.user;
                });
               }

  ngOnInit() {
    this.editUserform = this.formBuilder.group({
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      telephone: new FormControl('', [Validators.required, Validators.pattern('^[0][1][0152]{1}[0-9]*') ,
                                      Validators.minLength(9), Validators.maxLength(11)]),
      username: ['', [Validators.minLength(4), Validators.maxLength(8), Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
    this.editUserform.reset(this.user);
    this.editUserform.get('dateOfBirth').setValue(moment(this.user.dateOfBirth).format('M/D/YYYY'));
    this.formchangePassword = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required])
    },
    {validators: MustMatch('newPassword', 'passwordConfirm')});
  }
  get f(){
    return this.editUserform.controls;
  }
  get fp(){
    return this.formchangePassword.controls;
  }
  changePassword(){
    if (this.formchangePassword.valid){
      this.authService.changePassword(this.user.id, this.formchangePassword.value).subscribe(d => {
        if (d.isChanged){
          this.alertify.success('تم تغيرُ كلمة المرور بنجاحٍ');
          this.formchangePassword.reset();
          this.authService.logout();
        }
      }, e => {
        console.log(e);
      });
    }
  }
  update(){
    if (this.editUserform.valid){
      this.userService.updateUser(this.user.id, this.editUserform.value).subscribe(d => {
        if (d.isUpdate){
          this.alertify.success('تم تعديل البيانات');
          this.editUserform.reset();
          this.authService.logout();
        }
      }, e => {
        console.log(e);
      });
    }
  }
  show(open: boolean, btn1, btn2){
    this.open = open;
    if (open){
      btn1.style.opacity = .5;
      btn2.style.opacity = 1;
    }else{
      btn2.style.opacity = .5;
      btn1.style.opacity = 1;
    }
  }

}
