import { IMetaDataRes } from './../../utils/interfaces/general.interfaces';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecipe } from './recipe.interface';
import { IGenericResList, UtilService } from 'src/app/utils';
import { RecipeQuery } from './recipe.models';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private http = inject(HttpClient);
    private utilService = inject(UtilService);

    //auxiliary variables
    accountApi = environment.backendUrl + '/api/recipes';

    // service state recipe list
    private relaodRecipesSubj: Subject<RecipeQuery> = new Subject();
    private recipes$: Observable<IGenericResList<IRecipe>> =
        this.relaodRecipesSubj.asObservable().pipe(
            switchMap((query: RecipeQuery) =>
                this.http.get<IGenericResList<IRecipe>>(
                    this.accountApi +
                        this.utilService.transformQueryIntoString(
                            query as Record<string, any>,
                        ),
                ),
            ),
            shareReplay(),
        );
    recipesSig = toSignal(this.recipes$, {
        initialValue: {
            data: [] as IRecipe[],
            metaData: {} as IMetaDataRes,
        },
    });

    // service state selected recipe
    private selectedRecipeSubj: Subject<string> = new Subject();
    private selectedRecipe$: Observable<IRecipe> = this.selectedRecipeSubj
        .asObservable()
        .pipe(
            filter((id: string) => !!id),
            switchMap((id: string) =>
                this.http.get<IRecipe>(`${this.accountApi}/${id}`),
            ),
        );
    selectedRecipeSig = toSignal(this.selectedRecipe$, { initialValue: null });

    reloadRecipes(query: RecipeQuery) {
        this.relaodRecipesSubj.next(query);
    }

    selectRecipe(id: string) {
        this.selectedRecipeSubj.next(id);
    }

    create(newRecipe: IRecipe): Observable<IRecipe> {
        return this.http.post<IRecipe>(this.accountApi, newRecipe);
    }

    update(updatedRecipe: IRecipe) {
        return this.http.put<IRecipe>(
            `${this.accountApi}/${updatedRecipe.id}`,
            updatedRecipe,
        );
    }

    recommend(id?: string) {
        return this.http.get<IRecipe>(`${this.accountApi}/${id}/recommend`);
    }

    delete(id?: string) {
        return this.http.delete<any>(`${this.accountApi}/${id}`);
    }
}
