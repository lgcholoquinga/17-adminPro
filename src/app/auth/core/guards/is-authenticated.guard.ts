import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enums';

export const isAuthenticatedGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (authService.authStatus() === AuthStatus.authenticated) return true;

	router.navigateByUrl('/auth/login');
	return true;
};
