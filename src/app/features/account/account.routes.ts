import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/components/guards/auth.guard';


export const ACCOUNT_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./account.component').then(m => m.AccountComponent),
		canActivate: [AuthGuard]
	}
];
