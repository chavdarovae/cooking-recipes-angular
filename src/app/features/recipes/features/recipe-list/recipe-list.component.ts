import { AuthService } from 'src/app/data-access';
import { Component, computed, effect, inject, Signal } from '@angular/core';
import { InputFieldComponent, PagingComponent } from 'src/app/ui';
import { NgForm } from '@angular/forms';
import { IGenericListRes } from 'src/app/utils';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../data-access/recipe.service';
import { IRecipe } from '../../utils/recipe.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeQuery } from '../../utils/recipe.models';
import { RecipeCardComponent } from '../../ui/recipe-card/recipe-card.component';

@Component({
    selector: 'rcp-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.scss',
    imports: [
        RecipeCardComponent,
        InputFieldComponent,
        PagingComponent,
        RouterLink,
    ],
    providers: [NgForm],
})
export class RecipeListComponent {
    // services
    authService = inject(AuthService);
    private recipeService = inject(RecipeService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    // main entity
    recipesResSig: Signal<IGenericListRes<IRecipe>> =
        this.recipeService.recipesSig;

    // query params
    queryParams = toSignal(this.route.queryParamMap);
    query = computed(() => {
        const qp = this.queryParams();
        return new RecipeQuery(
            qp?.get('search') ?? undefined,
            qp?.get('owner') ?? undefined,
            qp?.get('page') ?? undefined,
            qp?.get('pageSize') ?? undefined,
            qp?.get('sort') ?? undefined,
        );
    });

    constructor() {
        let lastQueryJson = '';

        effect(
            () => {
                const query = this.query();
                const currentJson = JSON.stringify(query);

                if (currentJson === lastQueryJson) return;
                lastQueryJson = currentJson;

                this.recipeService.reloadRecipes(query);
            },
            { allowSignalWrites: true },
        );
    }

    onSearchStringChange(search: string) {
        this.router.navigate([], {
            queryParams: { search, page: 1 },
            queryParamsHandling: 'merge', // keeps existing params
        });
    }

    onPagingChange(paging: { page: number; pageSize: number }) {
        this.router.navigate([], {
            queryParams: paging,
            queryParamsHandling: 'merge', // keeps existing params
        });
    }
}
