import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { AuthService } from './data-access/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ]
})
export class AppComponent implements OnInit {
	protected authService = inject(AuthService);
  	title = 'cooking-recipes-angular';

	ngOnInit(): void {
		this.authService.getOwnAccount().subscribe()
	}
}
