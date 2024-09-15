import { FormControl } from '@angular/forms';

export interface IPersonDataForm {
	names: FormControl<string>;
	lastName: FormControl<string>;
}
