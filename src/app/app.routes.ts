import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes'),
	},
	{
		path: 'admin',
		canActivate: [],
		loadChildren: () => import('./admin/admin.routes'),
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
