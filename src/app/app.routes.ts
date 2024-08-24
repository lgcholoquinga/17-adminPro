import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'gifs',
		loadChildren: () => import('./gifs/gifs.routes').then((r) => r.GIFS_ROUTES),
	},
	{
		path: 'products',
		loadChildren: () => import('./products/products.routes').then((r) => r.PRODUCTS_ROUTES),
	},
	{
		path: '',
		redirectTo: '/products',
		pathMatch: 'full',
	},
];
