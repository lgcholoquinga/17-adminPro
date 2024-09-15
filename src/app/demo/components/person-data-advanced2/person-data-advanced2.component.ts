import { v4 as uuidv4 } from 'uuid';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-person-data-advanced2',
	standalone: true,
	imports: [ReactiveFormsModule, NgIf],
	templateUrl: './person-data-advanced2.component.html',
	styleUrl: './person-data-advanced2.component.scss',
})
export class PersonDataAdvanced2Component implements OnInit {
	public idMother = `input-${uuidv4()}`;
	public idFather = `input-${uuidv4()}`;

	@Input({ required: true }) title = '';
	@Input({ required: true }) controlKey = '';

	private _parentContainer = inject(ControlContainer);
	public formGroup!: FormGroup;

	ngOnInit(): void {
		this.formGroup = this.parentFormGroup;
	}

	get parentFormGroup() {
		return this._parentContainer.control?.get(this.controlKey) as FormGroup;
	}
}
