import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import {
    provideRouter,
    RouterModule,
    withComponentInputBinding,
    withHashLocation,
} from '@angular/router';

import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
    AuthInterceptor,
    ErrorCatchingInterceptor,
    LoaderInterceptor,
} from './data-access';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        importProvidersFrom(
            BrowserAnimationsModule,
            BrowserModule,
            RouterModule.forRoot(routes, {
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled',
                onSameUrlNavigation: 'reload',
                useHash: true,
            }),
        ),
        provideRouter(routes, withComponentInputBinding(), withHashLocation()),
        provideHttpClient(),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorCatchingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
    ],
};
