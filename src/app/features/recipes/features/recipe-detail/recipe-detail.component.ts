import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from 'src/app/ui';
import { AlertService } from 'src/app/data-access';
import { AuthService } from 'src/app/data-access/services/auth.service';
import {
    catchError,
    distinctUntilChanged,
    EMPTY,
    Observable,
    of,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RecipeService } from '../../data-access/recipe.service';
import { IRecipeRes } from '../../utils/recipe.interface';

type RecipeUserInteractionType = 'deleteDialog' | 'delete' | 'recommend';

@Component({
    selector: 'rcp-recipe-detail',
    standalone: true,
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.scss',
    imports: [RouterLink, ModalComponent, AsyncPipe],
})
export class RecipeDetailComponent implements OnInit {
    // services
    private recipeService = inject(RecipeService);
    private alertService = inject(AlertService);
    private router = inject(Router);
    public authService = inject(AuthService);

    // imlicit input from routing
    @Input() id!: string;

    // user interaction
    userIteractionSubj: Subject<RecipeUserInteractionType> = new Subject();
    userIteraction$!: Observable<IRecipeRes>;
    currInteraction!: RecipeUserInteractionType;

    // main entity
    selectedRecipeSig: Signal<IRecipeRes | null> =
        this.recipeService.selectedRecipeSig;

    // aucxiliary variables
    showModal = false;

    ngOnInit(): void {
        this.recipeService.selectRecipe(this.id);
        this.initUserInteraction();
    }

    onModalClosed(confirmation: boolean) {
        if (confirmation) {
            this.userIteractionSubj.next('delete');
        }
        this.showModal = false;
    }

    isAlreadyRecommendedByCurrUser(): boolean {
        const recipe = this.selectedRecipeSig();
        const currUserId = this.authService.currUserSig()?.id;

        if (!recipe?.recommendList || !currUserId) {
            return false;
        }

        return recipe.recommendList
            ?.flatMap((x: { id: string }) => x.id)
            ?.includes(currUserId);
    }

    private initUserInteraction(): void {
        this.userIteraction$ = this.userIteractionSubj.asObservable().pipe(
            distinctUntilChanged((prev, curr) => {
                return curr.includes('Dialog') ? false : prev === curr;
            }),
            tap((action) => (this.currInteraction = action)),
            switchMap((action) => {
                switch (action) {
                    case 'deleteDialog':
                        return of('deleteDialog').pipe(
                            tap(() => (this.showModal = true)),
                        );
                    case 'delete':
                        return this.recipeService
                            .delete(this.selectedRecipeSig()?.id)
                            .pipe(
                                tap(() =>
                                    this.router.navigateByUrl('/recipes'),
                                ),
                            );
                    case 'recommend':
                        return this.recipeService.recommend(
                            this.selectedRecipeSig()?.id,
                        );
                }
            }),
            tap(() => {
                if (!['deleteDialog'].includes(this.currInteraction)) {
                    this.alertService.showAlert({
                        alert: `The recipe was successfully ${this.currInteraction}d!`,
                        type: 'success',
                    });
                }
            }),
            catchError((err: HttpErrorResponse) => {
                console.error('Recipe operation failed:', err);
                this.initUserInteraction();
                return EMPTY;
            }),
        );
    }
}
