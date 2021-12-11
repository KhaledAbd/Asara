import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ExtraExpenses } from "src/models/extraExpenses";
import { BarrenService } from "src/service/barren.service";

@Injectable()
export class ExtraExpensesDailyResolver implements Resolve<ExtraExpenses[]> {
    constructor(private barrenService: BarrenService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ExtraExpenses[] | Observable<ExtraExpenses[]> | Promise<ExtraExpenses[]> {
        return this.barrenService.getExtraExpensesByDay(new Date().toLocaleDateString());
    }
}
