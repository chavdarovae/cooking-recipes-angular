import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccount } from './user.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currUser = signal<IAccount | null | undefined>(undefined);
	currUserSig = computed(()=> this.currUser());

	// auxiliary varibles
	private accountApi = environment.backendUrl + '/api/users';
	private currUserSotrageKey = 'currUser';

	constructor(
		private http: HttpClient,
		private router: Router,
	) {
		const storedCurrUser = JSON.parse(localStorage.getItem(this.currUserSotrageKey) as string);
		this.setCurrUser(storedCurrUser);
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
			tap((user: IAccount) => this.setCurrUser(user)),
			first()
		);
	}

	logout(): Observable<any> {
		return this.http.get<IAccount>(this.accountApi + '/logout').pipe(
			tap(() => this.setCurrUser(null)),
			first()
		);
	}

	private setCurrUser(user: IAccount | null) {
		this.currUser.set(user);
		localStorage.setItem(this.currUserSotrageKey, JSON.stringify(user));
		this.router.navigateByUrl('/');
	}
}
