import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Gifs, GifsResponse } from '../models';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class GifsService {
	private _api_key = environment.GIPHY_API_KEY;
	private _urlApi = environment.URL_API_GIPHY;

	private _http = inject(HttpClient);

	private _tagsHistory: string[] = [];

	get tagsHistory() {
		return [...this._tagsHistory];
	}

	organizeTag(tag: string) {
		tag = tag.toLowerCase();

		if (this._tagsHistory.includes(tag)) {
			this._tagsHistory = this._tagsHistory.filter((tg) => tg !== tag);
		}

		this._tagsHistory.unshift(tag);
		this._tagsHistory = this._tagsHistory.splice(0, 10);
	}

	searchTag(tag: string): Observable<Gifs[]> {
		this.organizeTag(tag);
		const params = new HttpParams().set('api_key', this._api_key).set('limit', '10').set('q', tag);
		return this._http.get<GifsResponse>(this._urlApi, { params }).pipe(map((data) => data.data));
	}
}
