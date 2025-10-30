import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './data-access/services/auth.service';
import { AlertComponent, FooterComponent, HeaderComponent } from './data-access';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AlertComponent
]
})
export class AppComponent implements OnInit {
	public authService = inject(AuthService);

	ngOnInit(): void {
		this.authService.getOwnAccount().subscribe()
	}
}
