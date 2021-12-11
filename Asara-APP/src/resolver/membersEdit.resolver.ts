import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/models/user';
import { UserService } from 'src/service/user.service';

@Injectable()
export class MembersEditResolver implements Resolve<User[]> {

    constructor(private userService: UserService, private router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {

        return this.userService.getUsers().pipe(catchError(e => {
            console.log(e);
            return of(null);
        }));
    }
}
