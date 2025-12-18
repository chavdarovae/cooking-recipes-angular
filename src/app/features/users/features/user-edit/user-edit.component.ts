import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
    catchError,
    distinctUntilChanged,
    EMPTY,
    Observable,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InputFieldComponent, InputSelectComponent } from 'src/app/ui';
import { AuthService } from 'src/app/data-access/services/auth.service';
import { IUser, UserRolesEnum } from 'src/app/utils';
import { AlertService } from 'src/app/data-access';
import { UserCreateItem, UserEditItem } from '../../utils/user.models';

type UserUserInteractionType = 'update' | 'delete' | 'create';

@Component({
    selector: 'rcp-user-edit',
    standalone: true,
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputFieldComponent,
        InputSelectComponent,
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
    user!: IUser | UserEditItem | UserCreateItem;
    currInteraction!: UserUserInteractionType;
    userRolesEnum = UserRolesEnum;

    // imlicit input from routing
    @Input() id!: string;

    ngOnInit(): void {
        this.user = new UserEditItem(history.state?.['user']);
        if (!this.user && this.id === 'add-new-user') {
            this.user = new UserCreateItem();
        }
        this.initUserInteraction();
    }

    isEditEntity(obj: any): obj is UserEditItem {
        return obj && obj.id;
    }

    isCreateEntity(obj: any): obj is UserCreateItem {
        return obj && !obj.id;
    }

    private initUserInteraction(): void {
        this.userIteraction$ = this.userIteractionSubj.asObservable().pipe(
            distinctUntilChanged(),
            tap((action) => (this.currInteraction = action)),
            switchMap((action) => {
                switch (action) {
                    case 'create':
                        return this.userService.createAccount(
                            this.user as UserCreateItem,
                        );
                    case 'update':
                        return this.userService.updateAccount(this.user);
                    case 'delete':
                        return this.userService.deleteAccount(this.user);
                }
            }),
            tap(() => {
                this.router.navigateByUrl('/users');
                this.alertService.showAlert({
                    alert: `The user was successfully ${this.currInteraction}d!`,
                    type: 'success',
                });
            }),
            catchError((err: HttpErrorResponse) => {
                console.error('User operation failed:', err);
                this.initUserInteraction();
                return EMPTY;
            }),
        );
    }
}
