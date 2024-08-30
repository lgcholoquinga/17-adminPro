import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ErrorFormComponent } from '@common/components';
import { NgxValidators } from '@common/validators';
import { ControlErrorDirective, FormSubmitDirective } from '@common/directives';

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
	private fb = inject(FormBuilder);

	public loginForm = this.fb.group({
		email: ['', [NgxValidators.required('The email field is required.'), NgxValidators.email()]],
		password: ['', [NgxValidators.required(), NgxValidators.minLength(6)]],
	});

	onLogin() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		console.log(this.loginForm.value);
	}
}
