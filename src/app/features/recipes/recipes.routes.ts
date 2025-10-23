import { Routes } from '@angular/router';
import { AuthGuard } from '../../data-access/auth.guard';


export const RECIPE_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./recipe-list/recipe-list.component').then(m => m.RecipeListComponent),
		canActivate: [AuthGuard]
	},
	{
		path: 'create',
		loadComponent: () => import('./recipe-create/recipe-create.component').then(m => m.RecipeCreateComponent),
		canActivate: [AuthGuard]
	},
	{
		path: ':id',
		loadComponent: () => import('./recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent),
		canActivate: [AuthGuard]
	},
	{
		path: ':id/edit',
		loadComponent: () => import('./recipe-create/recipe-create.component').then(m => m.RecipeCreateComponent),
		canActivate: [AuthGuard]
	},
];
