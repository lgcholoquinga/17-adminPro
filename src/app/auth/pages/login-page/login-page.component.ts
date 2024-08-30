import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ErrorFormComponent } from '@common/components';
import { NgxValidators } from '@common/validators';
import { ControlErrorDirective, FormSubmitDirective } from '@common/directives';
import { AuthService } from '@auth/core/services/auth.service';

import Swal from 'sweetalert2';

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
export default class LoginPageComponent {
	private authService = inject(AuthService);
	private fb = inject(FormBuilder);
	private router = inject(Router);

	public loginForm = this.fb.nonNullable.group({
		email: ['maria23@gmail.com', [NgxValidators.required('The email field is required.'), NgxValidators.email()]],
		password: ['123456', [NgxValidators.required(), NgxValidators.minLength(6)]],
	});

	onLogin() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		const { email, password } = this.loginForm.controls;
		this.authService.login(email.value, password.value).subscribe({
			next: () => this.router.navigateByUrl('/admin'),
			error: (message) => {
				Swal.fire({
					title: 'Error',
					text: message,
					icon: 'error',
					confirmButtonText: 'OK',
				});
			},
		});
	}
}
