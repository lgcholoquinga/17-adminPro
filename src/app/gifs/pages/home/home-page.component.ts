import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { CardListComponent, SearchBoxComponent } from '../../components';
import { GifsService } from 'app/gifs/core';
import { Gifs } from 'app/gifs/core/models';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [SearchBoxComponent, CardListComponent, AsyncPipe],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
	private gifsService = inject(GifsService);

	public gifs$?: Observable<Gifs[]>;

	onSearch(tag: string) {
		this.gifs$ = this.gifsService.searchTag(tag);
	}
}
