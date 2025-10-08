import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, first, Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
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
	private relaodRecipesSubj: Subject<boolean> = new Subject();
	private recipes$: Observable<IRecipe[]> = this.relaodRecipesSubj.asObservable().pipe(
		switchMap(() =>this.http.get<IRecipe[]>(this.accountApi)),
		shareReplay(),
	);
	recipesSig = toSignal(this.recipes$, {initialValue: [] as IRecipe[]});

	// service state selected recipe
	private selectedRecipeSubj: Subject<string> = new Subject();
	private selectedRecipe$: Observable<IRecipe> = this.selectedRecipeSubj.asObservable().pipe(
		filter((id: string) => !!id),
		switchMap((id: string) => this.http.get<IRecipe>(`${this.accountApi}/${id}`)),
	);
	selectedRecipeSig = toSignal(this.selectedRecipe$, {initialValue: null});

	reloadRecipes() {
		this.relaodRecipesSubj.next(true);
	}

	selectRecipe(id: string) {
		this.selectedRecipeSubj.next(id);
	}

	create(newRecipe: IRecipe): Observable<IRecipe> {
		return this.http.post<IRecipe>(this.accountApi, newRecipe);
	}

	update(updatedRecipe: IRecipe) {
		return this.http.put<IRecipe>(`${this.accountApi}/${updatedRecipe._id}`, updatedRecipe);
	}

	recommend(id?: string) {
		return this.http.get<IRecipe>(`${this.accountApi}/${id}/recommend`);
	}

	delete(id?: string) {
		return this.http.delete<any>(`${this.accountApi}/${id}`);
	}
}
