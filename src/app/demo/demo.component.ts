import { Component } from '@angular/core';
import { LgButtonComponent, LgInputComponent } from '@common/components';
import { LgInputBasicComponent } from '@common/components/lg-input-basic/lg-input-basic.component';

@Component({
	selector: 'app-demo',
	standalone: true,
	imports: [LgButtonComponent, LgInputComponent, LgInputBasicComponent],
	templateUrl: './demo.component.html',
	styleUrl: './demo.component.scss',
})
export default class DemoComponent {}
