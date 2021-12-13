import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

  confirm(message: string, okCallback: () => any){
    alertify.confirm(message, (e: any) => {
      if (e){
        okCallback();
      }else{}
    });
  }

  success(message: string){
    alertify.success(message);
  }
  error(message: string){
    alertify.error(message);
  }
  warn(message: string){
    alertify.warn(message);
  }
  message(message: string){
    alertify.message(message);
  }
}
