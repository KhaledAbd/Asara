import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AppComponent } from './../app/app.component';

@Injectable({providedIn: 'root'})
export class PreventSaveChangesGuard implements CanDeactivate<AppComponent>{
    canDeactivate(component: AppComponent){
        if (component){
            return confirm('are you sure to continue?');
        }
        return true;
    }

}
