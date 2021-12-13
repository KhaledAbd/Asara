import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from 'src/models/bill';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  postBill(model): Observable<{isSaved: boolean,  bill: Bill, isNotEnough: boolean}> | null {
    return this.http.post<{isSaved: boolean,  bill: Bill, isNotEnough: boolean}>(apiUrl + 'bill', model);
  }
  deleteBill(id: number): Observable<any> |null{
    return this.http.delete<any>(apiUrl + `bill/${id}`);
  }

}
