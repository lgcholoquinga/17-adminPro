import { Routes } from '@angular/router';

export default [
	{
		path: '',
		loadComponent: () => import('./demo.component'),
		children: [],
	},
] as Routes;
