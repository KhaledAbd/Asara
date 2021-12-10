import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shop } from 'src/models/shop';
const apiUrl = environment.apiUrl;
@Injectable()
export class ShopResolver implements Resolve<Shop> {
    constructor(private http: HttpClient){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Shop | Observable<Shop> | Promise<Shop> {
        return this.http.get<Shop>(apiUrl + `shop`);
    }
}
