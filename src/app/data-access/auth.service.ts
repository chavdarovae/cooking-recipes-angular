import { UtilService } from './../utils/util.service';
import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccount, IUser, IUserQuery } from '../features/users/user.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currUser = signal<IAccount | null | undefined>(undefined);
	currUserSig = computed(() => this.currUser());

	// service state account list
	private relaodAccountsSubj: Subject<IUserQuery> = new Subject();
	private accounts$: Observable<IAccount[]> = this.relaodAccountsSubj.asObservable().pipe(
		switchMap((query: IUserQuery) => this.getAllAccounts(query)),
		shareReplay(),
	);
	accountsSig = toSignal(this.accounts$, {initialValue: [] as IAccount[]});

	// auxiliary varibles
	private accountApi = environment.backendUrl + '/api/users';
	private currUserSotrageKey = 'currUser';

	constructor(
		private http: HttpClient,
		private router: Router,
		private utilService: UtilService
	) {
		const storedCurrUser = JSON.parse(localStorage.getItem(this.currUserSotrageKey) as string);
		this.setCurrUser(storedCurrUser);
	}

	relaodAccountList(query: IUserQuery) {
		this.relaodAccountsSubj.next(query);
	}

	getOwnAccount(): Observable<IAccount> {
		return this.http.get<IAccount>(this.accountApi + '/ownAccount').pipe(
			tap((user: IAccount) => this.setCurrUser(user)),
			first()
		);
	}

	register(registerData: IAccount): Observable<IAccount> {
		return this.http.post<IAccount>(this.accountApi + '/register', registerData).pipe(
			tap((user: IAccount) => this.setCurrUser(user)),
			first()
		);
	}

	login(loginData: IAccount): Observable<IAccount> {
		return this.http.post<IAccount>(this.accountApi + '/login', loginData).pipe(
			tap((user: IAccount) => {
				this.setCurrUser(user);
				this.router.navigateByUrl('/');
			}),
			first()
		);
	}

	logout(): Observable<any> {
		return this.http.get<IAccount>(this.accountApi + '/logout').pipe(
			tap(() => {
				this.setCurrUserAsGuest();
				this.router.navigateByUrl('/')
			}),
			first()
		);
	}

	getAllAccounts(query: IUserQuery): Observable<IAccount[]> {
		return this.http.get<IAccount[]>(this.accountApi + '/accounts'  + this.utilService.transformQueryIntoString(query as unknown as Record<string, string>));
	}

	getAccount(userId: string): Observable<IAccount> {
		return this.http.get<IAccount>(this.accountApi + '/accounts/' + userId).pipe(
			first()
		);
	}

	updateAccount(modifiedUser: IUser): Observable<IAccount> {
		return this.http.put<IAccount>(this.accountApi + '/accounts/' + modifiedUser._id, modifiedUser).pipe(
			first()
		);
	}

	setCurrUserAsGuest() {
		this.setCurrUser(null);
	}

	private setCurrUser(user: IAccount | null) {
		this.currUser.set(user);
		localStorage.setItem(this.currUserSotrageKey, JSON.stringify(user));
	}
}
