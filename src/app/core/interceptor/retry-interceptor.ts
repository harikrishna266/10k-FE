import {Injectable} from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, tap} from 'rxjs';
import {Router} from '@angular/router';
import {StoreService} from "../services/store.service";
import {UserService} from "../services/user.service";

@Injectable()

export class RetryInterceptor implements HttpInterceptor {
	private refreshTokenInProgress = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(
		public userSer: UserService,
		public storeSer: StoreService,
		private router: Router
	) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(
				catchError((error) => {
					console.log('on');
					if (this.ignoreRequest(request.url)) {
						throw new HttpErrorResponse(error);
					}
					if (!this.refreshTokenInProgress) {
						return this.tryUpdatingAccessToken(request, next)
					} else {
						return this.makeAllApiWait(request, next)
					}
				})
			)
	}

	makeAllApiWait(request: HttpRequest<any>, next: HttpHandler) {
		return this.refreshTokenSubject
			.pipe(
				filter(result => result !== null),
				take(1),
				switchMap(() => next.handle(this.updateToken(request)))
			)
	}

	ignoreRequest(url: string): boolean {
		const lastUrl = url.split('/').slice(-1);
		if(['refresh-token'].includes(lastUrl[0]) ) {
			this.logoutTheUser();
		}
		return ['login', 'register'].includes(lastUrl[0]);
	}

	tryUpdatingAccessToken(request: HttpRequest<any>, next: HttpHandler) {
		this.refreshTokenInProgress = true;
		return this.userSer
			.getNewAccessToken()
			.pipe(
				tap((e) => this.saveNewAccessToken(e)),
				switchMap((res: any) => this.setHeaderAndRetry(request, next))
			)
	}

	setHeaderAndRetry(request: HttpRequest<any>, next: HttpHandler) {
		const req = this.updateToken(request)
		return next.handle(req)
	}

	updateToken(request: HttpRequest<any>) {
		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.storeSer.token}`,
			}
		});
	}

	saveNewAccessToken(e: any) {
		this.storeSer.token = e.accessToken
		this.refreshTokenSubject.next(e.accessToken);
	}

	logoutTheUser() {
		this.storeSer.token = '';
		this.storeSer.refreshToken = '';
		this.router.navigate(['/login']);
	}

}


