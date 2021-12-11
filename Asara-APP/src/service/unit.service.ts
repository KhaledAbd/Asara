import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unit } from '../models/unit';

const apiUrl = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class UnitService {

    constructor(private http: HttpClient) { }

    getUnits(): Observable<Unit[]> | null {
        return this.http.get<Unit[]>(apiUrl + 'unit');
    }
    postUnit(model: {
        name: string
    }): Observable<{isSaved: boolean, unit: Unit}> | null {
        return this.http.post<{isSaved: boolean, unit: Unit}>(apiUrl + 'unit', model);
    }
    deleteUnit(model: {
        id: number,
        name: string
    }): Observable<any> | null {
        return this.http.delete<any>(apiUrl + 'unit/' + model.id);
    }
    putUnit(model: {
        id: number,
        name: string
    }): Observable<any>| null {
        return this.http.put<any>(apiUrl + 'unit/' + model.id, model);

    }
}
