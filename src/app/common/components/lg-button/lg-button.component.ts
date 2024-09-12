import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnColorDirective, LgDisabledDirective } from '@common/directives';

@Component({
	selector: 'button[lgButton],a[lgButton]',
	standalone: true,
	template: `<ng-content></ng-content>`,
	styleUrl: './lg-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BtnColorDirective,
			inputs: ['color'],
		},
		{
			directive: LgDisabledDirective,
			inputs: ['disabled'],
		},
	],
})
export class LgButtonComponent {}
