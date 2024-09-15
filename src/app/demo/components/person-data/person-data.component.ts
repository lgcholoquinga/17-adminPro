import { v4 as uuidv4 } from 'uuid';
import { Component, forwardRef, inject, Input, OnDestroy } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	ValidationErrors,
	Validator,
	Validators,
} from '@angular/forms';

import { LgInputBasicComponent } from '@common/components';
import { IPersonData, IPersonDataForm } from '@demo/models';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-person-data',
	standalone: true,
	imports: [LgInputBasicComponent, ReactiveFormsModule],
	templateUrl: './person-data.component.html',
	styleUrl: './person-data.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PersonDataComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => PersonDataComponent),
			multi: true,
		},
	],
})
export class PersonDataComponent implements ControlValueAccessor, Validator, OnDestroy {
	@Input({ required: true }) title = '';

	public idMother = `input-${uuidv4()}`;
	public idFather = `input-${uuidv4()}`;

	private _formBuilder = inject(NonNullableFormBuilder);
	private _onChanged = (_value: { names: string; lastName: string }) => {};
	private _onTouch: () => void = () => {};
	private $destroy = new Subject<void>();

	form = this._formBuilder.group<IPersonDataForm>({
		names: this._formBuilder.control('', { validators: [Validators.required] }),
		lastName: this._formBuilder.control('', { validators: [Validators.required] }),
	});

	constructor() {
		this.form.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(() => {
			const value = this.form.value;
			this._onChanged(value as { names: string; lastName: string });
			this._onTouch();
		});
	}

	//#region Validator

	validate(_control: AbstractControl): ValidationErrors | null {
		return this.form.valid ? null : { personData: true };
	}

	registerOnValidatorChange?(fn: () => void): void {
		this._onChanged = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	//#endregion

	//#region ControlValueAccesor

	writeValue(obj: IPersonData): void {
		if (obj) {
			this.form.setValue(obj);
		}
	}

	registerOnChange(fn: () => void): void {
		this._onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this._onTouch = fn;
	}

	//#endregion

	ngOnDestroy(): void {
		this.$destroy.next();
		this.$destroy.complete();
	}
}
