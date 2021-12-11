import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Unit } from 'src/models/unit';
import { UnitService } from 'src/service/unit.service';

@Injectable()
export class UnitResolver implements Resolve<Unit[]> {
    constructor(private unitService: UnitService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Unit[] | Observable<Unit[]> | Promise<Unit[]> {
        return this.unitService.getUnits();
    }
}
