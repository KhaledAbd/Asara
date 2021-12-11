import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expenses } from 'src/models/expenses';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  deleteExpenses(id: number): Observable<{isDeleted: boolean, expenses: Expenses}> |null{
    return this.http.delete<any>(apiUrl + `expenses/${id}`);
  }
  AddExpenses(model: Expenses): Observable<{isSaved: boolean, expenses: Expenses}> | null{
    return this.http.post<{isSaved: boolean, expenses: Expenses}>(apiUrl + 'expenses',model);
  }
  getExpenses(billId: number):  Observable<Expenses[]> | null {
    return this.http.get<Expenses[]>(apiUrl + `expenses/${billId}`);
  }
}
