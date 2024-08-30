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
	private readonly ngControl = inject(NgControl);
	private readonly form = inject(FormSubmitDirective, { optional: true });
	private readonly destroy$ = new Subject<void>();
	private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

	private readonly submit$ = this.form ? this.form.submit$ : EMPTY;
	private readonly blurEvent$ = fromEvent(this.elementRef.nativeElement, 'blur');

	/* Create dynamic compornet */
	private readonly vcr = inject(ViewContainerRef);
	private componentRef!: ComponentRef<ErrorFormComponent>;

	ngOnInit(): void {
		merge(this.submit$, this.blurEvent$, this.ngControl.statusChanges!)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				const errorControl = getFormControlError(this.ngControl.control!);
				this.setError(errorControl);
			});
	}

	setError(value: string) {
		if (!this.componentRef) {
			this.componentRef = this.vcr.createComponent(ErrorFormComponent);
		}

		this.componentRef.instance.error = value;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
