import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from "@angular/core";
import { LowerCasePipe } from '@angular/common';
import { AccountService } from './account.service';
import { AuthService } from 'src/app/data-access/services/auth.service';


@Component({
	selector: 'app-account',
	standalone: true,
	imports: [
		RouterLink,
		LowerCasePipe
	],
	templateUrl: './account.component.html',
	styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
	// services
	private accountService = inject(AccountService);
	authService = inject(AuthService);


	ownRecipesSig = this.accountService.ownRecipesSig;

	ngOnInit(): void {
		this.accountService.reloadHomeInfo(this.authService.currUserSig()?._id);
	}
}
