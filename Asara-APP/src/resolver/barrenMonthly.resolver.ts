import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BarrenItem } from 'src/models/barrenItem';
import { BarrenService } from 'src/service/barren.service';

@Injectable()
export class BarrenMonthlyResolver implements Resolve<BarrenItem[]> {
    constructor(private barrenService: BarrenService){
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const date = new Date();
        return this.barrenService.getBarrenMonthly({
            month: date.getMonth() + 1,
            year: date.getFullYear()
        });
    }
}
