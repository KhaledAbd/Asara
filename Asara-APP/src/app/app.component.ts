import { Component, HostListener } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title;
  open: boolean;
  user: User;
  money: number;
  constructor(public authService: AuthService){
    authService.currentUser.subscribe(d => {
      this.user = d;
    });
  }
  setOpen(value){
    this.open = value;
  }
  logout(){
    this.open = false;
    this.authService.logout();
  }
  // @HostListener('window:click', ['$event.target'])
  //  hide(event){
  //   if (event.id === 'show-side-navigation1') {
  //     this.open = false;
  //   }
  // }
}
