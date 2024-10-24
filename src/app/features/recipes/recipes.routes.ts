import { Routes } from '@angular/router';
import { AuthGuard } from '../users/auth.guard';


export const recipeRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./recipe-list/recipe-list.component').then(m => m.RecipeListComponent),
		canActivate: [AuthGuard]
	},
	{
		path: ':id',
		loadComponent: () => import('./recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent),
		canActivate: [AuthGuard]
	},
];
