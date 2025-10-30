import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	authService = inject(AuthService);
	alertSrevice = inject(AlertService);
	router = inject(Router);

	canActivate(): boolean {
		if (this.authService.currUserSig()) {
			return true;
		} else {
			this.router.navigateByUrl('/users/login' );
			this.alertSrevice.showAlert({
				alert: 'You are not authorised for this section. Please login!',
				type: 'warning'
			});
			return false;
		}
	}
}
