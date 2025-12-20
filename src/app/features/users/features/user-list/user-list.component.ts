import { Component, computed, effect, inject, Signal } from '@angular/core';
import { AuthService } from 'src/app/data-access/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
    InputFieldComponent,
    InputSelectComponent,
    PaginationComponent,
} from 'src/app/ui';
import { NgForm } from '@angular/forms';
import { IAccount, IGenericListRes, UserRolesEnum } from 'src/app/utils';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserCradComponent } from '../../ui/user-card/user-card.component';
import { UserQuery } from '../../utils/user.models';
import { PaginationService } from 'src/app/data-access';

@Component({
    selector: 'rcp-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [
        RouterLink,
        InputFieldComponent,
        InputSelectComponent,
        PaginationComponent,
        UserCradComponent,
    ],
    providers: [NgForm],
})
export class UserListComponent {
    // services
    private authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private paginationService = inject(PaginationService<UserQuery>);

    // main entity
    accountsResSig: Signal<IGenericListRes<IAccount>> =
        this.authService.accountsSig;

    // auxiliary variables
    queryParam = toSignal(this.route.queryParamMap);

    query = computed(() => {
        const qp = this.queryParam();
        return new UserQuery(
            qp?.get('search') ?? undefined,
            qp?.get('role') ?? undefined,
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
                this.paginationService.setState(query);
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

    onRoleChanged(role: string) {
        this.router.navigate([], {
            queryParams: { role, page: 1 },
            queryParamsHandling: 'merge', // keeps existing params
        });
    }

    onPagingChange(paging: { page: number; pageSize: number }) {
        this.router.navigate([], {
            queryParams: paging,
            queryParamsHandling: 'merge', // keeps existing params
        });
    }
}
