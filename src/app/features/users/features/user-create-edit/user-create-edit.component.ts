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
import { IUserRes, UserRolesEnum } from 'src/app/utils';
import { AlertService, PaginationService } from 'src/app/data-access';
import {
    UserCreateItem,
    UserQuery,
    UserUpdateItem,
} from '../../utils/user.models';

type UserUserInteractionType = 'update' | 'delete' | 'create';

@Component({
    selector: 'rcp-user-create-edit',
    standalone: true,
    templateUrl: './user-create-edit.component.html',
    styleUrl: './user-create-edit.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputFieldComponent,
        InputSelectComponent,
    ],
})
export class UserCreateEditComponent implements OnInit {
    // services
    private userService = inject(AuthService);
    private alertService = inject(AlertService);
    private router = inject(Router);
    paginationService = inject(PaginationService<UserQuery>);

    // user interaction stream
    userIteractionSubj: Subject<UserUserInteractionType> = new Subject();
    userIteraction$!: Observable<IUserRes>;
    allowedInteraction!: UserUserInteractionType;

    // main entity
    user!: IUserRes | UserUpdateItem | UserCreateItem;
    currInteraction!: UserUserInteractionType;
    userRolesEnum = UserRolesEnum;

    // implicit input from routing
    @Input() id!: string;

    ngOnInit(): void {
        if (history.state?.['user']) {
            this.user = new UserUpdateItem(history.state?.['user']);
        } else if (!this.user && this.id === 'add-new-entity') {
            this.user = new UserCreateItem();
        }
        this.allowedInteraction = (this.user as IUserRes)?.id
            ? 'update'
            : 'create';
        this.initUserInteraction();
    }

    isUpdateEntity(obj: any): obj is UserUpdateItem {
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
                        return this.userService.updateAccount(
                            this.user as UserUpdateItem,
                        );
                    case 'delete':
                        return this.userService.deleteAccount(this.id);
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
