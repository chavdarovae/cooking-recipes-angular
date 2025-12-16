import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data-access';

@Component({
    selector: 'rcp-logout',
    standalone: true,
    imports: [],
    template: '',
})
export class LogoutComponent implements OnInit {
    authService = inject(AuthService);
    router = inject(Router);

    ngOnInit(): void {
        this.authService.logout().subscribe();
    }
}
