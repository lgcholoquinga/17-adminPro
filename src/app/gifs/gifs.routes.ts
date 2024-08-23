import { Routes } from '@angular/router';

export const GIFS_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./gifs.component'),
		children: [],
	},
];
