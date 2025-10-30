import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private tokenService = inject(HttpXsrfTokenExtractor);

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.tokenService.getToken();
		if (token !== null) {
			req = req.clone({ withCredentials: true });
		}
		return next.handle(req);
	}
}
