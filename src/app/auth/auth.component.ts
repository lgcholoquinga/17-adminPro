import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
	selector: 'auth',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss',
	providers: [AuthService],
})
export default class AuthComponent {}
