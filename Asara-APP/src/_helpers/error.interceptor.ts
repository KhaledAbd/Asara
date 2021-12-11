import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/service/auth.service';
@Injectable()
export class ErrorInterceptor  implements HttpInterceptor{
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(
                error => {
                    if (error instanceof HttpErrorResponse){
                        if (error.status === 401){
                            this.authService.logout();
                            return throwError(error.statusText);
                        }
                        const applicationError = error.headers.get('Application-Error');
                        if (applicationError){
                            console.error(applicationError);
                            return throwError(applicationError);
                        }
                        const serverError = error.error;
                        let modalStateErrors = '';
                        if (serverError && typeof serverError === 'object'){
                            for (const key in serverError){
                                if (serverError[key]){
                                    modalStateErrors += serverError[key] + '\n';
                                }
                            }
                        }
                        return throwError(modalStateErrors || serverError || 'Server Error');

                    }
                }
            )
        );
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
