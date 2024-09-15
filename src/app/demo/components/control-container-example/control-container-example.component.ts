import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LgButtonComponent, LgInputBasicComponent } from '@common/components';
import { PersonDataComponent } from '../person-data';
import { PersonDataAdvancedComponent } from '../person-data-advanced';
import { PersonDataAdvanced2Component } from '../person-data-advanced2';
import { ControlErrorDirective, FormSubmitDirective } from '@common/directives';

@Component({
	selector: 'app-control-container-example',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		LgInputBasicComponent,
		LgButtonComponent,
		PersonDataComponent,
		PersonDataAdvancedComponent,
		PersonDataAdvanced2Component,
		ControlErrorDirective,
		FormSubmitDirective,
	],
	templateUrl: './control-container-example.component.html',
	styleUrl: './control-container-example.component.scss',
})
export class ControlContainerExampleComponent {
	private _formBuilder = inject(FormBuilder);

	public form = this._formBuilder.group({
		dataFather: this._formBuilder.group({
			names: this._formBuilder.control('', { validators: [Validators.required] }),
			lastName: this._formBuilder.control('', { validators: [Validators.required] }),
		}),
		dataMother: this._formBuilder.group({
			names: this._formBuilder.control('', { validators: [Validators.required] }),
			lastName: this._formBuilder.control('', { validators: [Validators.required] }),
		}),
	});

	onSave() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		// const dataFather = getFormControlValueAsType<IPersonData>(this.form, 'dataFather');
		// const dataMother = getFormControlValueAsType<IPersonData>(this.form, 'dataMother');
		// console.log(dataFather?.names);
		// console.log(dataMother?.names);
		console.log(this.form.controls.dataFather.getRawValue());
		console.log(this.form.controls.dataMother.getRawValue());
	}
}
