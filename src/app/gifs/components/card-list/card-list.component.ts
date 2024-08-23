import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Gifs } from 'app/gifs/core/models';

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [JsonPipe],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
})
export class CardListComponent {
	@Input({ required: true }) gifs: Gifs[] = [];
}
