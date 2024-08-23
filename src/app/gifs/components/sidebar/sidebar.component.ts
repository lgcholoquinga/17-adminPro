import { Component, inject } from '@angular/core';
import { GifsService } from '../../core';
import { TitleCasePipe } from '@angular/common';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [TitleCasePipe],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	private readonly gifsService = inject(GifsService);

	public get tags() {
		return this.gifsService.tagsHistory;
	}
}
