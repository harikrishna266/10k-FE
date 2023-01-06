import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {StoreService} from "../services/store.service";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
	constructor(private router: Router, private storeSer: StoreService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const accessToken = this.storeSer.token;
		const refresh = this.storeSer.refreshToken;
		if (accessToken) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`,
					'x-refresh': `${refresh}`
				}
			});
		}
		return next.handle(request);
	}
}
