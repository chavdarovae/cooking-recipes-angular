import { AuthService } from 'src/app/data-access/auth.service';
import { AccountService } from './account.service';
import { Component, inject, OnInit } from '@angular/core';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { CardComponent } from 'src/app/ui';
import { RouterLink } from "@angular/router";

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
