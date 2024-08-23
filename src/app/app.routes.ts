import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'gifs',
		loadChildren: () => import('./gifs/gifs.routes').then((r) => r.GIFS_ROUTES),
	},
	{
		path: '',
		redirectTo: '/gifs',
		pathMatch: 'full',
	},
];
