import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
	},
	{
		path: 'gifs',
		loadChildren: () => import('./gifs/gifs.routes').then((r) => r.GIFS_ROUTES),
	},
	{
		path: '',
		redirectTo: '/auth',
		pathMatch: 'full',
	},
];
