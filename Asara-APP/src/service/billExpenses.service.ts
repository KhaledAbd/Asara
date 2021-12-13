import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from 'src/models/bill';
import { Expenses } from 'src/models/expenses';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BillExpensesService {

  constructor(private http: HttpClient) { }

  searchForClient(model: {
    clientName: string,
    dateOfBill: Date,
    billType: number
  }): Observable<string[]> | null {
    return this.http.post<string[]>(apiUrl + 'billExpenses/client',model);
  }
  
  getBills(model: {
    clientName: string,
    dateOfBill: Date,
    billType: number
  }): Observable<Bill[]> | null{
    return this.http.post<Bill[]>(apiUrl + 'billExpenses',model);
  }
  getBill(billId): Observable<Bill> | null{
    return this.http.get<Bill>(apiUrl + 'bill/' + billId);
  }

}
