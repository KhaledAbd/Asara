import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { BarrenService } from "src/service/barren.service";

@Injectable()
export class BarrenDailyResolver implements Resolve<any> {
    constructor(private barrenService: BarrenService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const date = new Date().toLocaleDateString().split('/');
        return this.barrenService.getBarrenDaily(date[2]+ '-' +date[0] + '-' +date[1]);
    }
}
