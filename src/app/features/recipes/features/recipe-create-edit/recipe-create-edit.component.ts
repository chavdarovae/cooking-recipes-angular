import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputFieldComponent, InputTextareaComponent } from 'src/app/ui';
import { AlertService, PaginationService } from 'src/app/data-access';
import {
    catchError,
    distinctUntilChanged,
    EMPTY,
    Observable,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RecipeService } from '../../data-access/recipe.service';
import { RecipeCreateItem, RecipeUpdateItem } from '../../utils/recipe.models';
import { IRecipeRes } from '../../utils/recipe.interface';

type RecipeUserInteractionType = 'create' | 'update';

@Component({
    selector: 'rcp-recipe-create-edit',
    standalone: true,
    templateUrl: './recipe-create-edit.component.html',
    styleUrl: './recipe-create-edit.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputFieldComponent,
        InputTextareaComponent,
    ],
})
export class RecipeCreateEditComponent implements OnInit {
    // services
    private recipeService = inject(RecipeService);
    private alertService = inject(AlertService);
    private router = inject(Router);
    paginationService = inject(PaginationService);

    // user interaction stream
    userIteractionSubj: Subject<RecipeUserInteractionType> = new Subject();
    userIteraction$!: Observable<IRecipeRes>;
    allowedInteraction!: RecipeUserInteractionType;

    // main entity
    recipe!: IRecipeRes | RecipeCreateItem | RecipeUpdateItem;
    currInteraction!: RecipeUserInteractionType;

    // implicit input from routing
    @Input() id!: string;

    ngOnInit(): void {
        if (history.state?.['recipe']) {
            this.recipe = new RecipeUpdateItem(history.state?.['recipe']);
        } else if (!this.recipe && this.id === 'add-new-entity') {
            this.recipe = new RecipeCreateItem();
        }

        this.allowedInteraction = (this.recipe as IRecipeRes)?.id
            ? 'update'
            : 'create';
        this.initUserInteraction();
    }

    private initUserInteraction(): void {
        this.userIteraction$ = this.userIteractionSubj.asObservable().pipe(
            distinctUntilChanged(),
            tap((action) => (this.currInteraction = action)),
            switchMap((action: RecipeUserInteractionType) => {
                switch (action) {
                    case 'create':
                        return this.recipeService.create(
                            this.recipe as RecipeCreateItem,
                        );
                    case 'update':
                        return this.recipeService.update(
                            this.id,
                            this.recipe as RecipeUpdateItem,
                        );
                }
            }),
            tap(() => {
                this.router.navigate(['/recipes'], {
                    queryParams: this.paginationService.prevReqMetaData(),
                    queryParamsHandling: 'merge',
                });
                this.alertService.showAlert({
                    alert: `The recipe was successfully ${this.currInteraction}d!`,
                    type: 'success',
                });
            }),
            catchError((err: HttpErrorResponse) => {
                console.error('Recipe operation failed:', err);
                this.initUserInteraction();
                return EMPTY;
            }),
        );
    }
}
