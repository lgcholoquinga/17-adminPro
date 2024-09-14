import { v4 as uuidv4 } from 'uuid';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'lg-input',
	standalone: true,
	imports: [],
	templateUrl: './lg-input.component.html',
	styleUrl: './lg-input.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LgInputComponent),
			multi: true,
		},
	],
})
export class LgInputComponent implements ControlValueAccessor {
	@Input() id = `input-${uuidv4()}`;
	@Input() label = '';
	@Input() type = 'text';
	@Input() placeholder = '';
	@Input() inputClass = '';
	@Input() labelClass = '';

	public valueInput: string | number = '';

	private _onChanged: (_: string | number) => void = () => {};
	private _onTouch: () => void = () => {};

	onInput(value: string): void {
		this.valueInput = value;
		this._onChanged(this.valueInput);
	}

	onTouched(): void {
		this._onTouch();
	}

	//#region ControlValueAccessor

	writeValue(value: string | number): void {
		if (value) {
			this.valueInput = value;
		}
	}

	registerOnChange(fn: (value: string | number) => void): void {
		this._onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this._onTouch = fn;
	}

	//#endregion
}
