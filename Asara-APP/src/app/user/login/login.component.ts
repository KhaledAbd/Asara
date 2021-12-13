import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/models/user';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  currentUser: User;
  isLogin: boolean;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
      if (authService.currentUserValue != null){
        this.currentUser = this.authService.currentUserValue;
        this.isLogin = true;
        this.router.navigate(['/item']);
      }
    }

  get username(){
    return this.formLogin.get('username');
  }
  get password(){
    return this.formLogin.get('password');
  }
  onSubmit(){
    if (this.formLogin.valid){
      this.authService.login(this.formLogin.value).pipe(first()).subscribe(next => {
        this.isLogin = true;
        this.currentUser = next.user;
        this.router.navigate(['/item']);
      }
      , err => {
        console.log(err);
        this.formLogin.setErrors({isLogin: true});
      });
    }
  }
  ngOnInit() {
  }

}
