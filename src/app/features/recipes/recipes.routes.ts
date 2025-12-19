import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/data-access';

export const RECIPE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/recipe-list/recipe-list.component').then(
                (m) => m.RecipeListComponent,
            ),
        canActivate: [],
    },
    {
        path: 'account',
        loadComponent: () =>
            import('./features/recipes-account/recipes-account.component').then(
                (m) => m.RecipesAccountComponent,
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'create-edit/:id',
        loadComponent: () =>
            import(
                './features/recipe-create-edit/recipe-create-edit.component'
            ).then((m) => m.RecipeCreateEditComponent),
        canActivate: [AuthGuard],
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./features/recipe-detail/recipe-detail.component').then(
                (m) => m.RecipeDetailComponent,
            ),
        canActivate: [AuthGuard],
    },
];
