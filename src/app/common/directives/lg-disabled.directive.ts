import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[lgDisabled]',
	standalone: true,
})
export class LgDisabledDirective {
	@Input()
	@HostBinding('class.disabled')
	disabled = false;

	@HostBinding('attr.disabled')
	protected get nativeDisabled(): '' | null {
		return this.disabled ? '' : null;
	}

	@HostListener('click', ['$event'])
	@HostListener('dblclick', ['$event'])
	onClick(e: Event) {
		if (this.disabled) {
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
}
