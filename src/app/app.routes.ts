import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '@auth/core/guards';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
	},
	{
		path: 'admin',
		canActivate: [isAuthenticatedGuard],
		loadChildren: () => import('./admin/admin.routes').then((r) => r.ADMIN_ROUTES),
	},
	{
		path: '',
		redirectTo: '/auth',
		pathMatch: 'full',
	},
];
