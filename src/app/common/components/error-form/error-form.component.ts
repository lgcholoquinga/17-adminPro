import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-error-form',
	standalone: true,
	imports: [],
	templateUrl: './error-form.component.html',
	styleUrl: './error-form.component.scss',
})
export class ErrorFormComponent {
	@Input() message?: string;
}
