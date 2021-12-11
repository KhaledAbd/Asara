import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserform: FormGroup;
  @Input() user: User;
  @Output() userEditEvent = new EventEmitter<{ isDeleted: boolean, user: User }>();
  @Output() openEvent = new EventEmitter<boolean>();
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.editUserform = new FormGroup({
      knownAs: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.minLength(4), Validators.maxLength(8), Validators.required]),
      lastActive: new FormControl('')
    });
    if (this.user) {
      this.editUserform.reset({
        knownAs: this.user.knownAs,
        dateOfBirth:  moment(this.user.dateOfBirth).format('DD-MM-YYYY'),
        city: this.user.city,
        telephone: this.user.telephone,
        username: this.user.username,
        lastActive:  moment(this.user.lastActive).format('M-DD, a hh:mm')
      });
    }
  }
  get f() {
    return this.editUserform.controls;
  }
  delete() {
    this.alertify.confirm('هل أنت مُتأكد من حذف هذا المُوظف؟', () => {
      if (this.authService.currentUserValue.id !== this.user.id) {
        this.authService.deleteUser(this.user.id).subscribe(
          d => {
            if (d.isDeleted) {
              this.userEditNewEvent({isDeleted: true, user: this.user});
              this.openNewEvent(false);
              this.alertify.message('تم حذف المُوظف بنجاح');
            }
          }, e => {
            console.log(e);
          }
        );
      } else {
        this.alertify.error('أولًا صلِّ على النبي .. ثانيًا أنت مُدير، فبالله عليك ينفع تحذف نفسك؟');
      }
    });

  }
  userEditNewEvent(itemAction: { isDeleted: boolean, user: User }) {
    this.userEditEvent.emit(itemAction);
  }
  openNewEvent(open) {
    this.openEvent.emit(open);
  }

  @HostListener('window:click', ['$event.target'])
  hide(event) {
    if (event.id === 'myModal') {
      this.openNewEvent(false);
    }
  }
}
