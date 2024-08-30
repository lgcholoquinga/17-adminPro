import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { environment } from '@environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { LoginResponse, User } from '../models';
import { AuthStatus } from '../enums';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly baseUrl = environment.API_URL_AUTH;
	private http = inject(HttpClient);

	private _currentUser = signal<User | null>(null);
	private _authStatus = signal<AuthStatus>(AuthStatus.checking);

	public currentUser = computed(() => this._currentUser());
	public authStatus = computed(() => this._authStatus());

	login(email: string, password: string): Observable<boolean> {
		const url = `${this.baseUrl}/auth/login`;

		return this.http.post<LoginResponse>(url, { email, password }).pipe(
			tap(({ user, token }) => {
				this._currentUser.set(user);
				this._authStatus.set(AuthStatus.authenticated);
				localStorage.setItem('token', token);
			}),
			map(() => true),
			catchError((err) => throwError(() => err.error.message)),
		);
	}
}
