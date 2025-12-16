import { LowerCasePipe } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/data-access';
import { RecipeQuery } from '../recipe.models';
import { IGenericResList } from 'src/app/utils';
import { IRecipe } from '../recipe.interface';

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

    ownRecipesResSig: Signal<IGenericResList<IRecipe>> =
        this.recipeService.recipesSig;

    ngOnInit(): void {
        this.recipeService.reloadRecipes(
            new RecipeQuery('null', this.authService.currUserSig()?.id),
        );
    }
}
