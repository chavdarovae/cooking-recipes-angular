import { HomeService } from './home.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
	// services
	private homeService = inject(HomeService);

	homeInfoSig = this.homeService.homeInfoSig;

	ngOnInit(): void {
		this.homeService.reloadHomeInfo();
	}
}
