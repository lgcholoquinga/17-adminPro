import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailPattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

/**
 * Method that allows to validate if the entry is a valid email
 * @param control Control input
 * @returns ValidationErrors or null
 */
export const customEmailValidator = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value;
	if (value === '') return null;

	if (!emailPattern.test(value)) {
		return { email: true };
	}

	return null;
};

/**
 * Method that permit validate the passwords field
 * @param formGroupControl Form Group
 * @returns ValidationErrors or null
 */
export const corssPasswordMatchingValidator: ValidatorFn = (
	formGroupControl: AbstractControl<{ password: string; confirmPassword: string }>,
): ValidationErrors | null => {
	const password = formGroupControl.value.password;
	const confirmPassword = formGroupControl.value.confirmPassword;

	return password !== confirmPassword ? { crossConfirmPasswordError: true } : null;
};
