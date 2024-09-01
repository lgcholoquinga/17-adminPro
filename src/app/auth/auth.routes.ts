import { Routes } from '@angular/router';

export default [
	{
		path: '',
		loadComponent: () => import('./auth.component'),
		children: [
			{
				path: 'login',
				loadComponent: () => import('./pages/login-page/login-page.component'),
			},
			{
				path: 'register',
				loadComponent: () => import('./pages/register-page/register-page.component'),
			},
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full',
			},
		],
	},
] as Routes;
