import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/data-access';
import { IAccount, IGenericListRes, IUser, UserRolesEnum } from 'src/app/utils';
import { RecipeService } from '../../data-access/recipe.service';
import { IRecipe } from '../../utils/recipe.interface';
import { RecipeQuery } from '../../utils/recipe.models';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent, InputSelectComponent } from 'src/app/ui';
import {
    UserCreateItem,
    UserEditItem,
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

    ownRecipesResSig: Signal<IGenericListRes<IRecipe>> =
        this.recipeService.recipesSig;

    userIteraction$!: Observable<IUser>;

    // main entity
    user!: IUser | UserEditItem | UserCreateItem;
    userRolesEnum = UserRolesEnum;

    // auxiliary
    isEditMode = false;

    constructor() {
        if (this.authService.currUserSig()) {
            this.user = new UserEditItem(
                this.authService.currUserSig() as IUser,
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
