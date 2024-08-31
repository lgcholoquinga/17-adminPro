import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-detail-page',
	standalone: true,
	imports: [],
	templateUrl: './user-detail-page.component.html',
	styleUrl: './user-detail-page.component.scss',
})
export default class UserDetailPageComponent implements OnInit {
	private activatedRoute = inject(ActivatedRoute);

	ngOnInit(): void {
		console.log(this.activatedRoute.snapshot.params['id']);
		console.log(this.activatedRoute.snapshot);
	}
}
