import { AccountService } from './account.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
	// services
	private accountService = inject(AccountService);

	homeInfoSig = this.accountService.homeInfoSig;

	ngOnInit(): void {
		this.accountService.reloadHomeInfo();
	}
}
