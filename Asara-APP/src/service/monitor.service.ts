import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  constructor(private http: HttpClient){}
  getMonitorMonthly(
    model: {
      month: number,
      year: number
    }
  ): Observable<any> | null{
    return this.http.get(apiUrl + `monitor/year/${model.year}/month/${model.month}`);
  }
  getMonitorDaily(
    day: string
  ): Observable<any> | null{
    return this.http.get(apiUrl + `monitor/${day}`);
  }

}
