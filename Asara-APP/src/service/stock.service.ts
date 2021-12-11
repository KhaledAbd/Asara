import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockBill } from 'src/models/stockBill';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  searchForWorker(value: any): Observable<string[]> | null {
    return this.http.post<string[]>(apiUrl + `stockBill/worker`, value);
  }
  getStockBills(value: any): Observable<StockBill[]> | null {
    return this.http.post<StockBill[]>(apiUrl + `stockBill`, value);
  }
  getStockBill(id: any): Observable<StockBill> |null {
    return this.http.get<StockBill>(apiUrl + `stock/${id}`);
  }
  postStockBill(model): Observable<{ isSaved: boolean, stockBill: StockBill}> | null{
    return this.http.post<{ isSaved: boolean, stockBill: StockBill}>(apiUrl + 'stock', model);
  }
  deleteStockBill(id: number): Observable<{ isDeleted: boolean, isNotEnough: boolean}> | null{
    return this.http.delete<{isDeleted: boolean, isNotEnough: boolean}>(apiUrl + `stock/${id}`);
  }
}
