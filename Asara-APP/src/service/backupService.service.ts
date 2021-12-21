import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

var apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BackupServiceService {

constructor(private http: HttpClient) { }

restoreData(id: number): Observable<any| null> {
  return this.http.get<any>(apiUrl + 'backup/restore/' + id);
} 
makeBackUp(id: number): Observable<any | null>{
  return this.http.get<any>(apiUrl + 'backup/' + id);
}

}
