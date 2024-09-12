import { Directive, HostBinding, Input } from '@angular/core';
import { UIColors } from '@common/enums';

@Directive({
	selector: '[btnColor]',
	standalone: true,
})
export class BtnColorDirective {
	@Input()
	color: string = UIColors.Primary;

	@HostBinding('class')
	protected get computedHostClass() {
		return ['btn', `btn-${this.validColor}`];
	}

	private get validColor(): string {
		return Object.values(UIColors).includes(this.color as UIColors) ? this.color : UIColors.Primary;
	}
}
