import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
	CommonModule,
	FormsModule,
	RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
	authService = inject(AuthService);

	model: any = {
		username: '',
		email: '',
		password: ''
	};
	submitted = false;


	onSubmit() {
		this.submitted = true;
		if (!this.model.email || !this.model.password|| !this.model.username) {
			return;
		}
		this.authService.register(this.model).subscribe()
	}
}
