import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MonitorService } from 'src/service/monitor.service';

@Injectable({
    providedIn: 'root'
})
export class MonitorMonthlyResolver implements Resolve<any> {
    constructor(private monitorService: MonitorService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const date = new Date();
        return this.monitorService.getMonitorMonthly({
            month: date.getMonth() + 1,
            year: date.getFullYear()
        })
    }
}
