import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../types/user.type";
import {Image} from "../../types/image.type";

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

	login(user: User): Observable<User> {
		return this.http.post<User>(`${environment.server}/login`, user).pipe(
			catchError(this.handleError<User>('login'))
		);
	}

	userDetails() {
		return this.http.get<User>(`${environment.server}/user/details/`).pipe(
			catchError(this.handleError<User>('userDetails')
		));
	}

	register(user: Omit<User, 'id'>): Observable<User> {
		return this.http.post<User>(`${environment.server}/register`, user).pipe(catchError(this.handleError<User>('register')));
	}


	getNewAccessToken() {
		return this.http.post(`${environment.server}refresh-token`, {}).pipe(catchError(this.handleError<User>('register')));
	}

	getUserImages(search: { limit: number, skip: number, search: string }): Observable<ImageApi> {
		const params = new HttpParams().set('limit', search.limit).set('search', search.search).set('skip', search.skip);
		return this.http.get<ImageApi>(`${environment.server}user/images/search`, {params}).pipe(
			catchError(
				this.handleError<ImageApi>('search')
			)
		)
	}

	private handleError<T>(operation = 'operation') {
		return (error: HttpErrorResponse): Observable<T> => {
			throw new Error(error.error.message);
		};
	}


}
