import { v4 as uuidv4 } from 'uuid';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-person-data-advanced',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './person-data-advanced.component.html',
	styleUrl: './person-data-advanced.component.scss',
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true }),
		},
	],
})
export class PersonDataAdvancedComponent implements OnInit {
	public idMother = `input-${uuidv4()}`;
	public idFather = `input-${uuidv4()}`;

	@Input({ required: true }) title = '';
	@Input({ required: true }) controlKey = '';

	private _formBuilder = inject(FormBuilder);
	private _parentContainer = inject(ControlContainer);

	ngOnInit(): void {
		this.parentFormGroup.addControl(
			this.controlKey,
			this._formBuilder.group({
				names: this._formBuilder.control('', { validators: [Validators.required] }),
				lastName: this._formBuilder.control('', { validators: [Validators.required] }),
			}),
		);
	}

	get parentFormGroup() {
		return this._parentContainer.control as FormGroup;
	}
}
