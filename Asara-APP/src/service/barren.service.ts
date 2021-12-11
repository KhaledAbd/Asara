import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BarrenItem } from 'src/models/barrenItem';
import { ExtraExpenses } from 'src/models/extraExpenses';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BarrenService {

constructor(private http: HttpClient) { }


getBarrenMonthly(
  model: {
    month: number,
    year: number
  }
): Observable<BarrenItem[]> | null{
  return this.http.get<BarrenItem[]>(apiUrl + `barren/year/${model.year}/month/${model.month}`);
}
getBarrenDaily(
  day: string
): Observable<BarrenItem[]> | null{
  return this.http.get<BarrenItem[]>(apiUrl + `barren/${day}`);
}
getExtraExpensesByMonth(datestring: string): Observable<ExtraExpenses[]> {
  const date = datestring.split('/');
  return this.http.get<ExtraExpenses[]>(apiUrl + `barrenExpenses/month/${date[2]}-${date[0]}-${date[1]}`);
}
getExtraExpensesByDay(datestring: string): Observable<ExtraExpenses[]> {
  const date = datestring.split('/');
  return this.http.get<ExtraExpenses[]>(apiUrl + `barrenExpenses/day/${date[2]}-${date[0]}-${date[1]}`);
}
ExtraExpensesByMonth(datestring: string): Observable<ExtraExpenses[]> {
  const date = datestring.split('/');
  return this.http.get<ExtraExpenses[]>(apiUrl + `barrenExpenses/month/${datestring}`);
}
ExtraExpensesByDay(datestring: string): Observable<ExtraExpenses[]> {
  return this.http.get<ExtraExpenses[]>(apiUrl + `barrenExpenses/day/${datestring}`);
}
}
