import { Component, computed, effect, inject, Signal } from '@angular/core';
import { InputFieldComponent, PagingComponent } from 'src/app/ui';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { IRecipe } from '../recipe.interface';
import { RecipeQuery } from '../recipe.models';
import { CardComponent } from '../components/card/card.component';
import { IGenericResList } from 'src/app/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'rcp-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.scss',
    imports: [CardComponent, InputFieldComponent, PagingComponent],
    providers: [NgForm],
})
export class RecipeListComponent {
    // services
    private recipeService = inject(RecipeService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    // main entity
    recipesResSig: Signal<IGenericResList<IRecipe>> =
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
