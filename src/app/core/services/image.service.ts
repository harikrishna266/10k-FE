import {Injectable} from '@angular/core';
import {HttpClient,  HttpParams, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(public http: HttpClient) {
	}

	uploadImage(file: FormData) {
		let params = new HttpParams();

		const options = {
			params: params,
			reportProgress: true,
		};

		const req = new HttpRequest('POST', `${environment.server}user/image/upload`, file, options);
		return this.http.request(req);
	}
}
