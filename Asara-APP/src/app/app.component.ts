import { Component, HostListener } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/service/alterify.service';
import { AuthService } from 'src/service/auth.service';
import { BackupServiceService } from 'src/service/backupService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Seven KSP";
  open: boolean;
  user: User;
  money: number;
  constructor(public authService: AuthService, private alertify: AlertifyService, private backup: BackupServiceService){
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
  restoreData(){
    this.alertify.confirm('هل تريد استرجاع البيانات ؟؟', () => {
      this.backup.restoreData(this.authService.currentUserValue.id).subscribe(s => {
        this.alertify.success('لقد تم استرجاع البيانات بنجاح');
        if(s.isRestore){
          console.log(s);
        }
      }, e => {
        console.log(e);
        this.alertify.error('تأكد من مكان مسار حفظ البيانات بالمعلومات السخصيه');
      });
  });
}
  @HostListener('window:beforeunload', ['$event'])
  unloadNotidication($event: any){
    $event.returnValue = true;
    console.log($event);
      this.alertify.confirm('هل تريد حفظ البيانات ؟؟', () => {
        this.backup.makeBackUp(this.authService.currentUserValue.id).subscribe(s => {
          this.alertify.success('لقد تم حفظ البيانات بنجاح');
          if(s.isBackup){
            console.log(s);
          }
        }, e => {
          console.log(e);
          this.alertify.error('تأكد من مكان مسار حفظ البيانات بالمعلومات السخصيه');
        })
      });
  }
}
