import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/data-access';
import { IGenericListRes, UserRolesEnum } from 'src/app/utils';
import { RecipeService } from '../../data-access/recipe.service';
import { IRecipeRes } from '../../utils/recipe.interface';
import { RecipeQuery } from '../../utils/recipe.models';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent, InputSelectComponent } from 'src/app/ui';
import { UserUpdateItem } from 'src/app/features/users/utils/user.models';
import { tap } from 'rxjs';

@Component({
    selector: 'rcp-recipes-account',
    standalone: true,

    templateUrl: './recipes-account.component.html',
    styleUrl: './recipes-account.component.scss',
    imports: [
        RouterLink,
        FormsModule,
        InputFieldComponent,
        InputSelectComponent,
    ],
})
export class RecipesAccountComponent implements OnInit {
    // services
    private recipeService = inject(RecipeService);
    authService = inject(AuthService);

    // main entities
    user = new UserUpdateItem(this.authService.currUserSig()!);
    ownRecipesResSig: Signal<IGenericListRes<IRecipeRes>> =
        this.recipeService.recipesSig;

    // auxiliary
    isEditMode = false;
    userRolesEnum = UserRolesEnum;

    constructor() {}

    ngOnInit(): void {
        this.recipeService.reloadRecipes(
            new RecipeQuery(undefined, this.authService.currUserSig()?.id),
        );
    }

    updateOwnAccount() {
        this.authService
            .updateOwnAccount(this.user)
            .pipe(tap(() => (this.isEditMode = false)))
            .subscribe();
    }
}
