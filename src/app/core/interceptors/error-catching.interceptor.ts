import { AuthService } from 'src/app/data-access/auth.service';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError as throwErrorObservable } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
	private alertService = inject(AlertService);
	private authService = inject(AuthService);
	private router = inject(Router);

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				// handle server side errors
				switch (error.status) {
					case 400:
						this.alertService.showAlert({
							alert: error.error?.errorMsg ?? 'Invalid information.',
							type: 'danger',
						});
						break;
					case 401:
						this.authService.setCurrUserAsGuest();
						this.router.navigateByUrl('/users/login');
						break;
					case 403:
						this.alertService.showAlert({
							alert: 'You are not authorised for this section. Please login!',
							type: 'danger',
						});
						break;
					case 404:
						this.router.navigateByUrl('/404');
						break;
					case 500:
						this.alertService.showAlert({
							alert: 'There is a server error',
							type: 'danger'
						});
						break;
				}
				return throwErrorObservable(() => error);
			})
		);
	}
}
