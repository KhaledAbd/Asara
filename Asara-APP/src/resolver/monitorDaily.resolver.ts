import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MonitorService } from 'src/service/monitor.service';

@Injectable()
export class MonitorDailyResolver  implements Resolve<any>{
    constructor(private monitorService: MonitorService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const date = new Date().toLocaleDateString().split('/');
        return this.monitorService.getMonitorDaily(date[2]+ '-' +date[0] + '-' +date[1]);
    }
}
