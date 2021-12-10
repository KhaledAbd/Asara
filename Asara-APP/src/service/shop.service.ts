import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shop } from 'src/models/shop';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ShopService {

constructor(private http: HttpClient) {
 }
 getShop(): Observable<Shop> | Shop {
   return this.http.get<Shop>(apiUrl + `shop`);
 }
 postShop(model: Shop): Observable<{shop: Shop, isSaved: boolean, isUpdated: boolean}>{
  return this.http.post<{shop: Shop, isSaved: boolean, isUpdated: boolean}>(apiUrl + `shop`, model);

 }

}
