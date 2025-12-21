import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRecipeRes } from '../utils/recipe.interface';
import { IGenericListRes, IMetaDataListRes } from 'src/app/utils';
import {
    RecipeCreateItem,
    RecipeUpdateItem,
    RecipeQuery,
} from '../utils/recipe.models';
import { PaginationService } from 'src/app/data-access';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private http = inject(HttpClient);
    private paginationService = inject(PaginationService);

    //auxiliary variables
    accountApi = environment.backendUrl + '/api/recipes';

    // service state recipe list
    private relaodRecipesSubj: Subject<RecipeQuery> = new Subject();
    private recipes$: Observable<IGenericListRes<IRecipeRes>> =
        this.relaodRecipesSubj.asObservable().pipe(
            switchMap((query: RecipeQuery) => {
                const params =
                    this.paginationService.transformQueryIntoParams<RecipeQuery>(
                        query,
                    );

                return this.http.get<IGenericListRes<IRecipeRes>>(
                    this.accountApi,
                    { params },
                );
            }),
            shareReplay(),
        );
    recipesSig = toSignal(this.recipes$, {
        initialValue: {
            data: [] as IRecipeRes[],
            metaData: {} as IMetaDataListRes,
        },
    });

    // service state selected recipe
    private selectedRecipeSubj: Subject<string> = new Subject();
    private selectedRecipe$: Observable<IRecipeRes> = this.selectedRecipeSubj
        .asObservable()
        .pipe(
            filter((id: string) => !!id),
            switchMap((id: string) =>
                this.http.get<IRecipeRes>(`${this.accountApi}/${id}`),
            ),
        );
    selectedRecipeSig = toSignal(this.selectedRecipe$, { initialValue: null });

    reloadRecipes(query: RecipeQuery) {
        this.relaodRecipesSubj.next(query);
    }

    selectRecipe(id: string) {
        this.selectedRecipeSubj.next(id);
    }

    create(newRecipe: RecipeCreateItem): Observable<IRecipeRes> {
        return this.http.post<IRecipeRes>(this.accountApi, newRecipe);
    }

    update(id: string, updatedRecipe: RecipeUpdateItem) {
        return this.http.put<IRecipeRes>(
            `${this.accountApi}/${id}`,
            updatedRecipe,
        );
    }

    recommend(id?: string) {
        return this.http.get<IRecipeRes>(`${this.accountApi}/${id}/recommend`);
    }

    delete(id?: string) {
        return this.http.delete<any>(`${this.accountApi}/${id}`);
    }
}
