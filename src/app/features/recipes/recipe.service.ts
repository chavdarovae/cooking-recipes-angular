import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, first, Observable, shareReplay, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecipe } from './recipe.interface';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	private http = inject(HttpClient);

	//auxiliary variables
	accountApi = environment.backendUrl + '/api/recipes';

	// service state recipe list
	private recipes$: Observable<IRecipe[]> = this.http.get<IRecipe[]>(this.accountApi).pipe(
		shareReplay(),
		first()
	);
	recipesSig = toSignal(this.recipes$, {initialValue: [] as IRecipe[]});

	// service state selected recipe
	private selectedRecipeId = signal<string>('');
	private selectedRecipe$: Observable<IRecipe> = toObservable(this.selectedRecipeId).pipe(
		filter((id: string) => !!id),
		switchMap((id: string) => this.http.get<IRecipe>(`${this.accountApi}/${id}`)),
		first()
	);
	selectedRecipeSig = toSignal(this.selectedRecipe$, {initialValue: null});

	selectRecipe(id: string) {
		this.selectedRecipeId.set(id);
	}

	create(newRecipe: IRecipe): Observable<IRecipe> {
		return this.http.post<IRecipe>(this.accountApi, newRecipe).pipe(
			first()
		);
	}

	update(updatedRecipe: IRecipe) {
		return this.http.put<IRecipe>(`${this.accountApi}/${updatedRecipe._id}`, updatedRecipe).pipe(
			first()
		);
	}

	delete(id: string) {
		return this.http.delete<any>(`${this.accountApi}/${id}`).pipe(
			first()
		);
	}
}
