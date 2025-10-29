import { AlertService } from '../../../core/services/alert.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserEditItem } from '../user.models';
import { catchError, distinctUntilChanged, EMPTY, Observable, Subject, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InputFieldComponent, InputSelectComponent } from 'src/app/ui';
import { IUser } from '../user.interface';
import { AuthService } from 'src/app/data-access/auth.service';
import { UserRolesEnum } from '../user.enums';

type UserUserInteractionType = 'update';

@Component({
	selector: 'app-user-edit',
	standalone: true,
	templateUrl: './user-edit.component.html',
	styleUrl: './user-edit.component.scss',
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		InputFieldComponent,
		InputSelectComponent
	],
})
export class UserEditComponent implements OnInit {
	// services
	private userService = inject(AuthService);
	private alertService = inject(AlertService);
	private router = inject(Router);

	// user interaction stream
	userIteractionSubj: Subject<UserUserInteractionType> = new Subject();
	userIteraction$!: Observable<IUser>;

	// main entity
	user!: IUser | UserEditItem;
	currInteraction!: UserUserInteractionType;
	userRolesEnum = UserRolesEnum;

	ngOnInit(): void {
		this.user = new UserEditItem(history.state?.['user']);
		this.initUserInteraction();
	}

	private initUserInteraction(): void {
		this.userIteraction$ = this.userIteractionSubj.asObservable().pipe(
			distinctUntilChanged(),
			tap((action) => this.currInteraction = action),
			switchMap((action) => {
				switch (action) {
					case 'update':
						return this.userService.updateAccount(this.user);
				}
			}),
			tap(() => {
				this.router.navigateByUrl('/users');
				this.alertService.showAlert({alert: `The user was successfully ${this.currInteraction}d!`, type: 'success'})
			}),
			catchError((err: HttpErrorResponse) => {
				console.error('User operation failed:', err);
				this.initUserInteraction();
				return EMPTY;
			})
		);
	}
}
