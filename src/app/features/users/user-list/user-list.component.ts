import { Component, computed, effect, inject, Signal } from '@angular/core';
import { AuthService } from 'src/app/data-access/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputFieldComponent, InputSelectComponent } from 'src/app/ui';
import { NgForm } from '@angular/forms';
import { UserQuery } from '../user.models';
import { IAccount, IGenericResList, UserRolesEnum } from 'src/app/utils';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [RouterLink, InputFieldComponent, InputSelectComponent],
    providers: [NgForm],
})
export class UserListComponent {
    // services
    private authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    // main entity
    accountsResSig: Signal<IGenericResList<IAccount>> =
        this.authService.accountsSig;

    // auxiliary variables
    queryParam = toSignal(this.route.queryParamMap);

    query = computed(() => {
        const qp = this.queryParam();
        return new UserQuery(
            qp?.get('search') ?? undefined,
            (qp?.get('role') as UserRolesEnum) ?? undefined,
            qp?.get('page') ?? undefined,
            qp?.get('pageSize') ?? undefined,
            qp?.get('sort') ?? undefined,
        );
    });
    userRolesEnum = UserRolesEnum;

    constructor() {
        let lastQueryJson = '';

        effect(
            () => {
                const query = this.query();
                const currentJson = JSON.stringify(query);

                if (currentJson === lastQueryJson) return;
                lastQueryJson = currentJson;

                this.authService.relaodAccountList(query);
            },
            { allowSignalWrites: true },
        );
    }

    onSearchChanged(search: string) {
        this.router.navigate([], {
            queryParams: { search, page: 1 },
            queryParamsHandling: 'merge', // keeps existing params
        });
    }

    onRoleChanged(role: UserRolesEnum) {
        this.router.navigate([], {
            queryParams: { role, page: 1 },
            queryParamsHandling: 'merge', // keeps existing params
        });
    }
}
