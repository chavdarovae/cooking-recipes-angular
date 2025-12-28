import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    Observable,
    catchError,
    throwError as throwErrorObservable,
} from 'rxjs';
import { AlertService } from '../util-services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
    private alertService = inject(AlertService);
    private authService = inject(AuthService);
    private router = inject(Router);

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 400:
                        this.alertService.showAlert({
                            alert: 'Invalid request.',
                            type: 'danger',
                        });
                        break;
                    case 401:
                        this.authService.setCurrUserAsGuest();
                        break;
                    case 403:
                        this.router.navigateByUrl('/users/login');
                        this.alertService.showAlert({
                            alert: 'Insurficient credentials. Please login!',
                            type: 'danger',
                        });
                        break;
                    case 404:
                        this.alertService.showAlert({
                            alert: 'Resource missing!',
                            type: 'danger',
                        });
                        break;
                    case 409:
                        this.alertService.showAlert({
                            alert: 'Resource state conflict!',
                            type: 'danger',
                        });
                        break;
                    case 422:
                        this.alertService.showAlert({
                            alert: 'Semantically invalid data!',
                            type: 'danger',
                        });
                        break;
                    case 500:
                        this.alertService.showAlert({
                            alert: 'Server error!',
                            type: 'danger',
                        });
                        break;
                }
                return throwErrorObservable(() => error);
            }),
        );
    }
}
