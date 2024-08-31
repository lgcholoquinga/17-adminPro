import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [JsonPipe, RouterOutlet],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export default class AdminComponent {}
