import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    IAccount,
    IGenericListRes,
    IMetaDataListRes,
    IUser,
    UtilService,
} from 'src/app/utils';
import { environment } from 'src/environments/environment';
import { UserCreateItem, UserQuery } from 'src/app/features/users/user.models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // services
    private http = inject(HttpClient);
    private router = inject(Router);
    private utilService = inject(UtilService);

    // main entity
    private currUser = signal<IAccount | null | undefined>(undefined);
    currUserSig = computed(() => this.currUser());

    // service state account list
    private relaodAccountsSubj: Subject<UserQuery> = new Subject();
    private accounts$: Observable<IGenericListRes<IAccount>> =
        this.relaodAccountsSubj.asObservable().pipe(
            switchMap((query: UserQuery) => this.getAllAccounts(query)),
            shareReplay(),
        );
    accountsSig = toSignal(this.accounts$, {
        initialValue: {
            data: [] as IAccount[],
            metaData: {} as IMetaDataListRes,
        },
    });

    // auxiliary varibles
    private accountApi = environment.backendUrl + '/api/users';
    private currUserSotrageKey = 'currUser';

    constructor() {
        const storedCurrUser = JSON.parse(
            localStorage.getItem(this.currUserSotrageKey) as string,
        );
        this.setCurrUser(storedCurrUser);
    }

    relaodAccountList(query: UserQuery) {
        this.relaodAccountsSubj.next(query);
    }

    getOwnAccount(): Observable<IAccount> {
        return this.http.get<IAccount>(this.accountApi + '/ownAccount').pipe(
            tap((user: IAccount) => this.setCurrUser(user)),
            first(),
        );
    }

    register(registerData: IAccount): Observable<IAccount> {
        return this.http
            .post<IAccount>(this.accountApi + '/register', registerData)
            .pipe(
                tap((user: IAccount) => this.setCurrUser(user)),
                first(),
            );
    }

    login(loginData: IAccount): Observable<IAccount> {
        return this.http
            .post<IAccount>(this.accountApi + '/login', loginData)
            .pipe(
                tap((user: IAccount) => {
                    this.setCurrUser(user);
                    this.router.navigateByUrl('/');
                }),
                first(),
            );
    }

    logout(): Observable<any> {
        return this.http.get<IAccount>(this.accountApi + '/logout').pipe(
            tap(() => {
                this.setCurrUserAsGuest();
                this.router.navigateByUrl('/');
            }),
            first(),
        );
    }

    getAllAccounts(query: UserQuery): Observable<IGenericListRes<IAccount>> {
        const params =
            this.utilService.transformQueryIntoParams<UserQuery>(query);
        return this.http.get<IGenericListRes<IAccount>>(
            this.accountApi + '/accounts',
            { params },
        );
    }

    getAccount(userId: string): Observable<IAccount> {
        return this.http
            .get<IAccount>(this.accountApi + '/accounts/' + userId)
            .pipe(first());
    }

    createAccount(createDto: UserCreateItem): Observable<IAccount> {
        return this.http
            .post<IAccount>(this.accountApi + '/accounts', createDto)
            .pipe(first());
    }

    updateAccount(modifiedUser: IUser): Observable<IAccount> {
        return this.http
            .put<IAccount>(
                this.accountApi + '/accounts/' + modifiedUser.id,
                modifiedUser,
            )
            .pipe(first());
    }

    deleteAccount(userToDelete: IUser): Observable<IAccount> {
        return this.http
            .delete<IAccount>(this.accountApi + '/accounts/' + userToDelete.id)
            .pipe(first());
    }

    setCurrUserAsGuest() {
        this.setCurrUser(null);
    }

    private setCurrUser(user: IAccount | null) {
        this.currUser.set(user);
        localStorage.setItem(this.currUserSotrageKey, JSON.stringify(user));
    }
}
