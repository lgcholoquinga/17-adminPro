import { Component } from '@angular/core';
import { SidebarComponent } from './components';
import { HomePageComponent } from './pages';

@Component({
	selector: 'app-gifs',
	standalone: true,
	imports: [SidebarComponent, HomePageComponent],
	templateUrl: './gifs.component.html',
	styleUrl: './gifs.component.scss',
})
export default class GifsComponent {}
