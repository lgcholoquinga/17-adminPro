import { ComponentRef, Directive, ElementRef, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, fromEvent, merge, Subject, takeUntil } from 'rxjs';

import { FormSubmitDirective } from './form-submit.directive';
import { getFormControlError } from '@common/validators';
import { ErrorFormComponent } from '@common/components';
import { ElementNativeHtml } from '../enums/elements-native.enum';

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
				const control = this._ngControl.control!;

				if (control.dirty || control.touched) {
					const errorControl = getFormControlError(control);
					this.setError(errorControl);
				}
			});
	}

	private setCustomUI() {
		const control = this._ngControl.control!;
		const hostElement = this.nativeElement as HTMLElement;
		if (hostElement === null) return;

		if (control.invalid && (control.dirty || control.touched)) {
			hostElement.classList.remove('is-valid');
			hostElement.classList.add('is-invalid');
		} else if (control.valid) {
			hostElement.classList.remove('is-invalid');
			hostElement.classList.add('is-valid');
		} else {
			hostElement.classList.remove('is-invalid');
			hostElement.classList.remove('is-valid');
		}
	}

	private setError(value: string) {
		if (!this.componentRef) {
			this.componentRef = this.vcr.createComponent(ErrorFormComponent);
		}

		this.componentRef.instance.error = value;
	}

	private get nativeElement(): HTMLElement | null {
		const host = this.elementRef.nativeElement;
		const lstElementsNative = Object.values(ElementNativeHtml);

		if (lstElementsNative.includes(host.tagName.toLowerCase() as ElementNativeHtml)) {
			return host;
		}

		const hostChild = Array.from(host.children).find((el) =>
			lstElementsNative.includes(el.tagName.toLowerCase() as ElementNativeHtml),
		) as HTMLElement;
		return hostChild ? hostChild : null;
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
