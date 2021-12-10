import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(apiUrl + 'users/' + id);
  }
  getUsers(): Observable<User[]>|null {
    return this.http.get<User[]>(apiUrl + 'users');
  }

  updateUser(id: number, model: {
    knownAs: string,
    city: string,
    telephone: string,
    username: string
  }): Observable<{isUpdate: boolean }>|null {
    return this.http.put<any>(apiUrl + 'users/' + id, model);
  }
}
