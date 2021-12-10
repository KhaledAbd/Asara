import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from 'src/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient){}
  loadRoles(): Observable<Role[]>{
      return this.http.get(environment.apiUrl + 'role').pipe(
      catchError(select => {
          console.log(select);
          return of(null);
      })
    );
  }
  loadUserRole(userId): Observable<Role[]>{
    return this.http.get<Role[]>(environment.apiUrl + 'role/' + userId).pipe(
      catchError(select => {
        console.log(select);
        return of(null);
    }),
    );
  }
}
