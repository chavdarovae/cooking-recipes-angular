import { Routes } from '@angular/router';


export const userRoutes: Routes = [
	{
		path: 'register',
		loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
	},
	{
		path: 'login',
		loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
	},
	{
		path: 'logout',
		loadComponent: () => import('./logout/logout.component').then(c => c.LogoutComponent),
	},
];
