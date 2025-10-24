import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/data-access/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	authService = inject(AuthService);
	router = inject(Router);

	canActivate(): boolean {
		if (this.authService.currUserSig()) {
			return true;
		} else {
			this.router.navigateByUrl('/users/login' );
			return false;
		}
	}
}
