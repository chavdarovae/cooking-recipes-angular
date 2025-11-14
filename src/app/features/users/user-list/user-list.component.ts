import { Component, inject, OnInit, Signal } from '@angular/core';
import { AuthService } from 'src/app/data-access/services/auth.service';
import { RouterLink } from '@angular/router';
import { InputFieldComponent, InputSelectComponent } from 'src/app/ui';
import { NgForm } from '@angular/forms';
import { UserQuery } from '../user.models';
import { IAccount, UserRolesEnum } from 'src/app/utils';

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [RouterLink, InputFieldComponent, InputSelectComponent],
    providers: [NgForm],
})
export class UserListComponent implements OnInit {
    // services
    private authService = inject(AuthService);

    // main entity
    accountsSig: Signal<IAccount[]> = this.authService.accountsSig;

    // auxiliary variables
    query!: UserQuery;
    userRolesEnum = UserRolesEnum;

    ngOnInit(): void {
        this.query = new UserQuery('');
        this.authService.relaodAccountList(this.query);
    }

    onSearchQueryChange() {
        this.authService.relaodAccountList(this.query);
    }
}
