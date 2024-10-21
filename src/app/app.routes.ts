import { Routes } from '@angular/router';
import { MENU_ITEMS } from './core/constants/menu-items';


export const routes: Routes = [
	{
		path: MENU_ITEMS['home'].path,
		loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
	},
	{
		path: MENU_ITEMS['contact'].path,
		loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
	},
	{
		path: MENU_ITEMS['login'].path,
		loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
	},
];
