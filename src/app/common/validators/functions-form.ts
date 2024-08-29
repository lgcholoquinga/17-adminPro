import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

const ERROR_DEFAULT: ValidationErrors = {
	required: 'The field is required',
	email: 'Enter a valid email adress',
};

export const getFormControlError = (formControl: AbstractControl): string => {
	if (!formControl.errors) return '';
	const firstErrorKey = Object.keys(formControl.errors!)[0];

	if (formControl.errors[firstErrorKey] === true) {
		return ERROR_DEFAULT[firstErrorKey];
	}

	return formControl.errors![firstErrorKey] || '';
};

export const getFormControlValueAsType = <T>(formGroup: FormGroup, controlName: string): T | null => {
	const control = formGroup.get(controlName);

	if (control) {
		return control.value as T;
	}

	return null;
};
