import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '@auth/core/services/auth.service';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [JsonPipe],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export default class AdminComponent {
	private authService = inject(AuthService);
	public user = computed(() => this.authService.currentUser());
}
