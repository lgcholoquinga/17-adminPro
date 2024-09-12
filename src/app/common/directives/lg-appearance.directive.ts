import { Directive, HostBinding, Input } from '@angular/core';
import { UIAppearance } from '@common/enums';

@Directive({
	selector: '[lgAppearance]',
	standalone: true,
})
export class LgAppearanceDirective {
	@Input()
	appearance: string = UIAppearance.Solid;

	@HostBinding('class')
	protected get computedClass() {
		return `btn-outline-${this.validAppearance}`;
	}

	private get validAppearance() {
		return Object.values(UIAppearance).includes(this.appearance as UIAppearance) ? this.appearance : UIAppearance.Solid;
	}
}
