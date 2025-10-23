import { Routes } from '@angular/router';


export const routes: Routes = [
	{
		path: '',
		redirectTo: 'recipes',
		pathMatch: 'full'
	},
	{
		path: 'account',
		loadChildren: () => import('./features/account/account.routes').then(r => r.ACCOUNT_ROUTES)
	},
	{
		path: 'users',
		loadChildren: () => import('./features/users/users.routes').then(r => r.USER_ROUTES)
	},
	{
		path: 'recipes',
		loadChildren: () => import('./features/recipes/recipes.routes').then(r => r.RECIPE_ROUTES)
	},
	{
		path: '404',
		loadComponent: () => import('./core/components/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
	},
	{
		path: '**',
		redirectTo: '/404',
		pathMatch: 'full'
	}
];
