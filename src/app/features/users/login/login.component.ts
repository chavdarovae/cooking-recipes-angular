import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	authService = inject(AuthService);

	model: any = {
		email: '',
		password: ''
	};
	submitted = false;


	onSubmit() {
		this.submitted = true;
		if (!this.model.email || !this.model.password) {
			return;
		}
		this.authService.login(this.model).subscribe()
	}
}
