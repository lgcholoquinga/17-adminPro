import { Routes } from '@angular/router';

export default [
	{
		path: '',
		loadComponent: () => import('./admin.component'),
		children: [
			{
				path: 'users',
				loadComponent: () => import('./pages/users-page/users-page.component'),
			},
			{
				path: 'user/:id',
				loadComponent: () => import('./pages/user-detail-page/user-detail-page.component'),
			},
			{
				path: '',
				redirectTo: 'users',
				pathMatch: 'full',
			},
		],
	},
] as Routes;
