import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { CheckTokenResponse, LoginResponse, User } from '../models';
import { AuthStatus } from '../enums';
import { LocalStorageService } from '@common/storage';

@Injectable()
export class AuthService {
	private readonly baseUrl = environment.API_URL_AUTH + '/auth';
	private http = inject(HttpClient);
	private localStorage = inject(LocalStorageService);

	private _currentUser = signal<User | null>(null);
	private _authStatus = signal<AuthStatus>(AuthStatus.checking);

	public currentUser = computed(() => this._currentUser());
	public authStatus = computed(() => this._authStatus());

	/**
	 * Method that permit signin
	 * @param email Email value
	 * @param password Password value
	 * @returns Observable value
	 */
	login(email: string, password: string): Observable<boolean> {
		const url = `${this.baseUrl}/login`;

		return this.http.post<LoginResponse>(url, { email, password }).pipe(
			map(({ user, token }) => this.setAuthentication(user, token)),
			catchError((err) => throwError(() => err.error.message)),
		);
	}

	checkAuthStatus(): Observable<boolean> {
		const url = `${this.baseUrl}/check-token`;
		const token = localStorage.getItem('token');

		if (!token) return of(false);

		const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
		return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
			map(({ user, token }) => this.setAuthentication(user, token)),
			catchError(() => {
				this._authStatus.set(AuthStatus.noAuthenticated);
				return of(false);
			}),
		);
	}

	private setAuthentication(user: User, token: string): boolean {
		this._currentUser.set(user);
		this._authStatus.set(AuthStatus.authenticated);
		this.localStorage.setItem('token', token);
		return true;
	}
}
