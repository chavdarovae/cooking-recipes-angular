import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecipe } from '../recipes/recipe.interface';


@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private http = inject(HttpClient);

	//auxiliary variables
	private recipesApi = environment.backendUrl + '/api/recipes';

	// service state home info
	private reloadAccountSubj: Subject<string | undefined> = new Subject();

	ownRecipesSig = toSignal(this.getOwnRecipes(), { initialValue: [] });

	reloadHomeInfo(userId?: string) {
		console.log(userId);

		this.reloadAccountSubj.next(userId);
	}

	private getOwnRecipes(): Observable<IRecipe[]> {
		return this.reloadAccountSubj.asObservable().pipe(
			filter((userId): userId is string => !!userId),
			switchMap(userId => this.http.get<IRecipe[]>(`${this.recipesApi}?owner=${userId}`)),
			shareReplay({ bufferSize: 1, refCount: true }),
		);
	}
}
