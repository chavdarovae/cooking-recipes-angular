import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/data-access';

export const USER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/user-list/user-list.component').then(
                (c) => c.UserListComponent,
            ),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./features/register/register.component').then(
                (c) => c.RegisterComponent,
            ),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/login/login.component').then(
                (c) => c.LoginComponent,
            ),
    },
    {
        path: 'logout',
        loadComponent: () =>
            import('./features/logout/logout.component').then(
                (c) => c.LogoutComponent,
            ),
    },
    {
        path: ':id',
        loadComponent: () =>
            import(
                './features/user-create-edit/user-create-edit.component'
            ).then((c) => c.UserCreateEditComponent),
        canActivate: [AuthGuard],
    },
];
