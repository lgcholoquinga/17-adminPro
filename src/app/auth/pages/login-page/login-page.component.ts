import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ErrorFormComponent } from '@common/components';
import { customEmailValidator, NgxValidators } from '@common/validators';
import { ControlErrorDirective, FormSubmitDirective } from '@common/directives';
import { AuthService } from '@auth/core/services/auth.service';

import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'auth-login-page',
	standalone: true,
	imports: [
		RouterLink,
		NgIf,
		NgClass,
		ReactiveFormsModule,
		ErrorFormComponent,
		FormSubmitDirective,
		ControlErrorDirective,
	],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export default class LoginPageComponent implements OnDestroy {
	private authService = inject(AuthService);
	private fb = inject(FormBuilder);
	private router = inject(Router);
	private readonly destroy$ = new Subject<void>();

	public loginForm = this.fb.nonNullable.group({
		email: ['', [NgxValidators.required('The email field is required.'), customEmailValidator]],
		password: ['', [NgxValidators.required(), NgxValidators.minLength(6)]],
	});

	onLogin() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		const { email, password } = this.loginForm.getRawValue();
		this.authService
			.login(email, password)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => this.router.navigateByUrl('/admin'),
				error: (message) => {
					Swal.fire({
						title: 'Error',
						text: message,
						icon: 'error',
						confirmButtonText: 'OK',
					});
					this.loginForm.reset();
				},
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
