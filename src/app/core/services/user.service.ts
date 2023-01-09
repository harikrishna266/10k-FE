import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../types/user.type";
import {Image} from "../../types/image.type";
import {loginResponse} from "../../login/login.component";

export type ImageApi = {
	count: number[]
	images: Image[]
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(public http: HttpClient) {
	}

	login(user: User) {
		return this.http.post<loginResponse>(`${environment.server}/login`, user)
	}

	userDetails() {
		return this.http.get<User>(`${environment.server}/user/details/`)
	}

	register(user: Omit<User, 'id'>): Observable<User> {
		return this.http.post<User>(`${environment.server}/register`, user)
	}


	getNewAccessToken() {
		return this.http.post(`${environment.server}refresh-token`, {})
	}

	getUserImages(search: { limit: number, skip: number, search: string }): Observable<ImageApi> {
		const params = new HttpParams().set('limit', search.limit).set('search', search.search).set('skip', search.skip);
		return this.http.get<ImageApi>(`${environment.server}user/images/search`, {params})
	}



}
