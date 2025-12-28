import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../util-services/alert.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    authService = inject(AuthService);
    alertSrevice = inject(AlertService);
    router = inject(Router);

    canActivate(): boolean {
        if (this.authService.currUserSig()) {
            return true;
        } else {
            this.router.navigateByUrl('/users/login');
            this.alertSrevice.showAlert({
                alert: 'Insurficient credetials for this resource. Please login!',
                type: 'warning',
            });
            return false;
        }
    }
}
