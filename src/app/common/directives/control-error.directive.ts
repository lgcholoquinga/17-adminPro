import { ComponentRef, Directive, ElementRef, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, fromEvent, merge, Subject, takeUntil } from 'rxjs';

import { FormSubmitDirective } from './form-submit.directive';
import { getFormControlError } from '@common/validators';
import { ErrorFormComponent } from '@common/components';

@Directive({
	selector: '[formControl], [formControlName]',
	standalone: true,
})
export class ControlErrorDirective implements OnInit, OnDestroy {
	private readonly _destroy$ = new Subject<void>();
	private readonly _ngControl = inject(NgControl);

	public elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
	private readonly _form = inject(FormSubmitDirective, { optional: true });
	private readonly _form$ = this._form ? this._form.submit$ : EMPTY;
	private readonly _blurEvent = fromEvent(this.elementRef.nativeElement, 'blur');

	private readonly vcr = inject(ViewContainerRef);
	private componentRef!: ComponentRef<ErrorFormComponent>;

	ngOnInit(): void {
		merge(this._form$, this._blurEvent, this._ngControl.statusChanges!)
			.pipe(takeUntil(this._destroy$))
			.subscribe(() => {
				this.setCustomUI();

				if (!this._ngControl.control!.untouched) {
					const errorControl = getFormControlError(this._ngControl.control!);
					this.setError(errorControl);
				}
			});
	}

	private setCustomUI() {
		const control = this._ngControl.control!;
		if (control.invalid && (control.dirty || control.touched)) {
			this.elementRef.nativeElement.classList.remove('is-valid');
			this.elementRef.nativeElement.classList.add('is-invalid');
		} else if (control.valid) {
			this.elementRef.nativeElement.classList.remove('is-invalid');
			this.elementRef.nativeElement.classList.add('is-valid');
		} else {
			this.elementRef.nativeElement.classList.remove('is-invalid');
			this.elementRef.nativeElement.classList.remove('is-valid');
		}
	}

	setError(value: string) {
		if (!this.componentRef) {
			this.componentRef = this.vcr.createComponent(ErrorFormComponent);
		}

		this.componentRef.instance.error = value;
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
