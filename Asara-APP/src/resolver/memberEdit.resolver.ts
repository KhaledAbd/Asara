import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/models/user';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Injectable()
export class MemberEditResolver  implements Resolve<User>{
    public constructor(private router: Router, private  userService: UserService, private authService: AuthService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): User | Observable<User> | Promise<User> {
        return this.userService.getUser(this.authService.currentUserValue.id).pipe(
            catchError(error => {
                console.log(error);
                return of(null);
            })
        );
    }
}
