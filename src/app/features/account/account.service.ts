import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';


interface IEntity {
	users: number,
	recipes: number
}

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private http = inject(HttpClient);

	//auxiliary variables
	private homeApi = environment.backendUrl + '/api/';

	// service state home info
	private reloadHomeSubj: Subject<boolean> = new Subject();

	homeInfoSig = toSignal(this.getHomeInfo(), { initialValue: { users: 0, recipes: 0 }  as IEntity});

	reloadHomeInfo() {
		this.reloadHomeSubj.next(true);
	}

	private getHomeInfo(): Observable<IEntity> {
		return this.reloadHomeSubj.asObservable().pipe(
			switchMap(() => this.http.get<IEntity>(this.homeApi)),
			shareReplay(),
		);
	}
}
