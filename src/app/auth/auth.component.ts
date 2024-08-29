import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'auth',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss',
})
export default class AuthComponent {}
