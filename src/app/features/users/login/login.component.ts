import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/data-access/services/auth.service';
import { InputFieldComponent } from 'src/app/ui';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, InputFieldComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    authService = inject(AuthService);
    router = inject(Router);

    model: any = {
        email: '',
        password: '',
    };

    ngOnInit(): void {
        if (this.authService.currUserSig()) {
            this.router.navigateByUrl('/');
        }
    }

    onSubmit() {
        if (!this.model.email || !this.model.password) {
            return;
        }
        this.authService.login(this.model).subscribe();
    }
}
