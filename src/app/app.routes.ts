import { Routes } from '@angular/router';


export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
	},
	{
		path: 'contact',
		loadComponent: () => import('./features/contact/contact.component').then(c => c.ContactComponent)
	},
	{
		path: 'users',
		loadChildren: () => import('./features/users/users.routes').then(r => r.userRoutes)
	},
	{
		path: 'recipes',
		loadChildren: () => import('./features/recipes/recipes.routes').then(r => r.recipeRoutes)
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
