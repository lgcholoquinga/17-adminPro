import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';

@Component({
	selector: 'app-error-form',
	standalone: true,
	imports: [NgIf],
	template: `@if (txtError) {
		<span class="text-error">{{ txtError }}</span>
	}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFormComponent {
	public txtError = '';
	private cdr = inject(ChangeDetectorRef);

	@Input() set error(value: string) {
		if (value !== this.txtError) {
			this.txtError = value;
			this.cdr.detectChanges();
		}
	}
}
