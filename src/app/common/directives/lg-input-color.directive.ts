import { Directive, HostBinding } from '@angular/core';

@Directive({
	selector: '[appLgInputColor]',
	standalone: true,
})
export class LgInputColorDirective {
	@HostBinding('class')
	protected get computedHostClass() {
		return ['form-control', 'form-control-primary'];
	}
}
