import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
	},
	{
		path: 'admin',
		canActivate: [],
		loadChildren: () => import('./admin/admin.routes').then((r) => r.ADMIN_ROUTES),
	},
	{
		path: '404',
		loadComponent: () => import('./common/pages/not-found-page/not-found-page.component'),
	},
	{
		path: '',
		redirectTo: '/auth',
		pathMatch: 'full',
	},
	{
		path: '**',
		loadComponent: () => import('./common/pages/not-found-page/not-found-page.component'),
	},
];
