import { Component, inject, OnInit, Signal } from '@angular/core';
import { AuthService } from 'src/app/data-access/auth.service';
import { IAccount } from '../user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
	// services
	private authService = inject(AuthService);

	// main entity
	accountsSig: Signal<IAccount[]> = this.authService.accountsSig;

	ngOnInit(): void {
		this.authService.relaodAccountList();
	}
}
