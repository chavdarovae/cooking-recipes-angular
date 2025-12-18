import { LowerCasePipe } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/data-access';
import { IGenericListRes } from 'src/app/utils';
import { RecipeService } from '../../data-access/recipe.service';
import { IRecipe } from '../../utils/recipe.interface';
import { RecipeQuery } from '../../utils/recipe.models';

@Component({
    selector: 'rcp-recipes-account',
    standalone: true,
    imports: [RouterLink, LowerCasePipe],
    templateUrl: './recipes-account.component.html',
    styleUrl: './recipes-account.component.scss',
})
export class RecipesAccountComponent implements OnInit {
    // services
    private recipeService = inject(RecipeService);
    authService = inject(AuthService);

    ownRecipesResSig: Signal<IGenericListRes<IRecipe>> =
        this.recipeService.recipesSig;

    ngOnInit(): void {
        this.recipeService.reloadRecipes(
            new RecipeQuery(undefined, this.authService.currUserSig()?.id),
        );
    }
}
