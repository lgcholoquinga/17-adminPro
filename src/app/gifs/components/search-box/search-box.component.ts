import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'app-search-box',
	standalone: true,
	imports: [],
	template: ` <h5>Search Gifs:</h5>
		<input type="text" placeholder="Search gifs..." #txtSearch class="form-control" (keyup.enter)="searchTag()" />`,
})
export class SearchBoxComponent {
	@Output() search = new EventEmitter<string>();

	@ViewChild('txtSearch') tagInput!: ElementRef<HTMLInputElement>;

	searchTag() {
		const tagValue = this.tagInput.nativeElement.value.trim();
		if (tagValue.length === 0) return;
		this.search.emit(tagValue);
		this.tagInput.nativeElement.value = '';
	}
}
