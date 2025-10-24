import { AuthService } from 'src/app/data-access/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecipe } from '../recipes/recipe.interface';


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
	private recipesApi = environment.backendUrl + '/api/recipes';

	// service state home info
	private reloadAccountSubj: Subject<boolean> = new Subject();

	ownRecipesSig = toSignal(this.getOwnRecipes(), { initialValue: [] });

	reloadHomeInfo() {
		this.reloadAccountSubj.next(true);
	}

	private getOwnRecipes(): Observable<IRecipe[]> {
		return this.reloadAccountSubj.asObservable().pipe(
			switchMap(() => this.http.get<IRecipe[]>(this.recipesApi)),
			shareReplay(),
		);
	}
}
