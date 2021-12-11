import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private urlrouter: Router){
  }
  canActivate(): boolean {
    if (this.auth.currentUserValue && localStorage.token){
      return true;
    }
    this.auth.logout();
    return false;
  }
}
