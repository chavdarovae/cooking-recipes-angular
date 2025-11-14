import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader-service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private loaderService = inject(LoaderService);

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.loaderService.showLoader();

        return next.handle(req).pipe(
            finalize(() => {
                this.loaderService.hideLoader();
            }),
        );
    }
}
