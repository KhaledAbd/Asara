import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { AuthService } from 'src/service/auth.service';

@Injectable()
export class JwtInterceptor {

    constructor(private accountService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user: User = this.accountService.currentUserValue;
        const isLoggedIn = (user && localStorage.token);
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + localStorage.token.slice(1, -1)
                }
            });
        }
        return next.handle(request);
    }
}
