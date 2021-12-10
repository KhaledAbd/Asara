import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExtraExpenses } from 'src/models/extraExpenses';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ExtraExpensesService {

constructor(private http: HttpClient) { }

  deleteExpenses(id: number): Observable<any> |null{
    return this.http.delete<any>(apiUrl + `extraExpenses/${id}`);
  }
  AddExtraExpenses(model:ExtraExpenses): Observable<{isSaved: boolean, extraExpenses: ExtraExpenses, isNotEnough: boolean}> | null{
    return this.http.post<{isSaved: boolean, extraExpenses: ExtraExpenses, isNotEnough: boolean}>(apiUrl + 'extraexpenses',model);
  }
  getExtraExpenses(): Observable<ExtraExpenses[]> | null {
    return this.http.get<ExtraExpenses[]>(apiUrl + `extraExpenses`);
  }
  getExtraExpensesByDate(date:Date): Observable<ExtraExpenses[]> | null {
    return this.http.get<ExtraExpenses[]>(apiUrl + `extraExpenses/${date}`);
  }
}
