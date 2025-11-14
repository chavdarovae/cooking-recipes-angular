import { LowerCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/data-access';
import { RecipeQuery } from '../recipe.models';

@Component({
    selector: 'app-recipes-account',
    standalone: true,
    imports: [RouterLink, LowerCasePipe],
    templateUrl: './recipes-account.component.html',
    styleUrl: './recipes-account.component.scss',
})
export class RecipesAccountComponent implements OnInit {
    // services
    private recipeService = inject(RecipeService);
    authService = inject(AuthService);

    ownRecipesSig = this.recipeService.recipesSig;

    ngOnInit(): void {
        this.recipeService.reloadRecipes(
            new RecipeQuery('null', this.authService.currUserSig()?._id),
        );
    }
}
