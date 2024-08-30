import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ErrorFormComponent } from '@common/components';
import { NgxValidators } from '@common/validators';
import { ControlErrorDirective, FormSubmitDirective } from '@common/directives';
import { AuthService } from '@auth/core/services/auth.service';

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

	public loginForm = this.fb.nonNullable.group({
		email: ['maria23@gmail.com', [NgxValidators.required('The email field is required.'), NgxValidators.email()]],
		password: ['1234567', [NgxValidators.required(), NgxValidators.minLength(6)]],
	});

	onLogin() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		const { email, password } = this.loginForm.controls;
		this.authService.login(email.value, password.value).subscribe({
			next: (response) => console.log(response),
			error: (err) => {
				console.log(err);
			},
		});
	}
}
