import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Role } from 'src/models/role';
import { AuthService } from 'src/service/auth.service';
import { RoleService } from 'src/service/role.service';

@Injectable()
export class AdminRoleResolver {
    constructor(private authService: AuthService, private roleService: RoleService, private router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Role[] | Observable<Role[]> | Promise<Role[]> {
        const isRoled = this.authService.roleMatch(['Admin']);
        if (!isRoled) {
            this.router.navigate(['/']);
            throwError('You Dont Have Permission');
        }
        return this.roleService.loadRoles();
    }
}
