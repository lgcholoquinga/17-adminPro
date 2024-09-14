import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LgDisabledDirective, LgInputColorDirective } from '@common/directives';

@Component({
	selector: 'input[lgInput]',
	standalone: true,
	template: `<ng-content></ng-content>`,
	styleUrl: './lg-input-basic.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: LgInputColorDirective,
		},
		{
			directive: LgDisabledDirective,
			inputs: ['disabled'],
		},
	],
})
export class LgInputBasicComponent {}
