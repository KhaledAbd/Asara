import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient) { }

    getItems(): Observable<Item[]> | null{
        return this.http.get<Item[]>(apiUrl + 'item');
    }
    postItem(model: {
        name: string,
        unitId: number,
        price: number
    }): Observable<any> | null{
        return this.http.post<any>(apiUrl + 'item', model);
    }

    deleteItem(id): Observable<any>| null{
        return this.http.delete(apiUrl + 'item/' + id);
    }
    updateItem(id, model: {
        name: string,
        price: number,
        quentity: number,
        unitId: number
    }): Observable<any>{
        return this.http.put<any>(apiUrl + 'item/' + id, model);
    }
}
