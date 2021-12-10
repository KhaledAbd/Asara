import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from 'src/models/account';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  AddAccount(model: Account): Observable<{isSaved: boolean, account: Account}> | null{
    return this.http.post<{isSaved: boolean, account: Account}>(apiUrl + 'account', model);
  }
  getAccount(): Observable<Account[]> | null {
    return this.http.get<Account[]>(apiUrl + `account`);
  }
  getAccountByDate(date: Date): Observable<Account[]> | null {
    return this.http.get<Account[]>(apiUrl + `account/${date}`);
  }
  deleteAccount(id: number): Observable<{isDeleted: boolean}>{
    return this.http.delete<{isDeleted: boolean}>(apiUrl + `account/${id}`);
  }
}
