import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../data-access/auth.service';

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
export class LoginComponent implements OnInit {
	authService = inject(AuthService);
	router = inject(Router);

	model: any = {
		email: '',
		password: ''
	};
	submitted = false;

	ngOnInit(): void {
		if (this.authService.currUserSig()) {
			this.router.navigateByUrl('/home');
		}
	}


	onSubmit() {
		this.submitted = true;
		if (!this.model.email || !this.model.password) {
			return;
		}
		this.authService.login(this.model).subscribe()
	}
}
