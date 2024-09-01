import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorDirective, FormSubmitDirective } from '@common/directives';

@Component({
	selector: 'auth-register-page',
	standalone: true,
	imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorDirective],
	templateUrl: './register-page.component.html',
	styleUrl: './register-page.component.scss',
})
export default class RegisterPageComponent {
	private readonly _fb = inject(NonNullableFormBuilder);

	public form = this._fb.group({
		name: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
		confirmPassword: ['', [Validators.required]],
	});

	onRegister() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log(this.form.getRawValue());
	}
}
