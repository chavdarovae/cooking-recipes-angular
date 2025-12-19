import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/data-access';
import { IGenericListRes, IUserRes, UserRolesEnum } from 'src/app/utils';
import { RecipeService } from '../../data-access/recipe.service';
import { IRecipeRes } from '../../utils/recipe.interface';
import { RecipeQuery } from '../../utils/recipe.models';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent, InputSelectComponent } from 'src/app/ui';
import {
    UserCreateItem,
    UserUpdateItem,
} from 'src/app/features/users/utils/user.models';
import { Observable } from 'rxjs';

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

    ownRecipesResSig: Signal<IGenericListRes<IRecipeRes>> =
        this.recipeService.recipesSig;

    userIteraction$!: Observable<IUserRes>;

    // main entity
    user!: IUserRes | UserUpdateItem | UserCreateItem;
    userRolesEnum = UserRolesEnum;

    // auxiliary
    isEditMode = false;

    constructor() {
        if (this.authService.currUserSig()) {
            this.user = new UserUpdateItem(
                this.authService.currUserSig() as IUserRes,
            );
        }
    }

    ngOnInit(): void {
        this.recipeService.reloadRecipes(
            new RecipeQuery(undefined, this.authService.currUserSig()?.id),
        );
    }

    updateOwnAccount() {}
}
