import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
const urlApi = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    jwtHelper = new JwtHelperService();
    constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser'))
      );
      this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(model: {username: string, password: string}){
      return this.http.post<any>(urlApi + 'auth/login', model).pipe(map(user => {
        if (user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          localStorage.setItem('token', JSON.stringify(user.token));
          this.currentUserSubject.next(user.user);
        }
        return user;
      }));
    }
    logout(){
      localStorage.clear();
      this.currentUserSubject.next(null);
      this.currentUser = null;
      this.router.navigateByUrl('/login');
    }
    roleMatch(allowedRoles) {
      let isMatch = false;
      const decodedToken = this.jwtHelper.decodeToken(localStorage.token);
      const userRoles = decodedToken.role as Array<string>;
      allowedRoles.forEach(element => {
          if (userRoles.includes(element)) {
              isMatch = true;
              return;
          }
      });
      return isMatch;
  }
  register(model: any){
    return this.http.post(urlApi + 'auth/register', model);
  }
  changePassword(id: number, model: {
    password: string,
    newPassword: string,
    passwordConfirm: string
  }): Observable<any>{
    return this.http.put<any>(urlApi + 'auth/' + id + '/changepassword', model);
  }
  isExist(username: {username: string}){
    return this.http.post<any>(urlApi + 'auth/isexist', username);
  }
  deleteUser(id): Observable<any> | null{
    return this.http.delete<any>(urlApi + 'auth/' + id);
  }
  setMoney(paid: number){
    this.currentUserSubject.next({...this.currentUserSubject.value, money: paid});
    localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
}
