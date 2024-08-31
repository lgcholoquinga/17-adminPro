import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
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
];
