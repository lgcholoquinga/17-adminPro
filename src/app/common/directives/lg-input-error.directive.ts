import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, merge, Subject, takeUntil } from 'rxjs';

@Directive({
	selector: 'input',
	standalone: true,
})
export class LgInputErrorDirective implements OnInit, OnDestroy {
	public elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);

	private _$destroy = new Subject<void>();
	private readonly _blurEvent = fromEvent(this.elementRef.nativeElement, 'blur');
	private readonly _ngControl = inject(NgControl);

	ngOnInit(): void {
		merge(this._blurEvent, this._ngControl.statusChanges!)
			.pipe(takeUntil(this._$destroy))
			.subscribe(() => {
				this.setCustomUI();
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

	ngOnDestroy(): void {
		this._$destroy.next();
		this._$destroy.complete();
	}
}
