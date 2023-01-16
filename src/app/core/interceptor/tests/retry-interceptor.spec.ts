import { getTestBed, TestBed} from "@angular/core/testing";
import {JwtInterceptor} from "../jwtInterceptor";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreService} from "../../services/store.service";
import {HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../app-routing.module";
import {RetryInterceptor} from "../retry-interceptor";
import {of} from "rxjs";

const StoreServiceMock  = {
	token: '123',
	refreshToken: '123',
}
const UserServiceMock  = {
	id: 1
}

//@ts-ignore
const request  = {
	clone:  jest.fn()
} as HttpRequest<any>;

const next = {
	handle: jest.fn()
} as HttpHandler;

describe('Retry Refresh Token ]', () => {
	let retry: RetryInterceptor;
	let userSer: UserService;
	let storeSer: StoreService;
	let injector: TestBed;
	const userInfo = {
		name: 'joe'
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				RouterTestingModule.withRoutes(routes),

			],
			providers: [
				{provide: StoreService, useValue: StoreServiceMock},
				{provide: UserService, useValue: UserServiceMock},
				RetryInterceptor
			]
		});
		injector = getTestBed();
		retry = injector.get(RetryInterceptor);
		storeSer = TestBed.inject(StoreService);
 	});

	describe('calling intercept function should append Authorization to header and call next', () => {
		let ignoreRequest: any;
		beforeEach(() => {
			//@ts-ignore
			jest.spyOn(next, "handle").mockImplementation(() => {
				//@ts-ignore
				return of(new HttpErrorResponse({
					//@ts-ignore
					status: 401, body: 'mockToDos'
				})) ;
			})
			jest.spyOn(retry, "ignoreRequest");

		})

		it('should call clone', () => {
			retry.intercept(request, next);

			expect(next.handle).toHaveBeenCalledTimes(1);
		})

	})
})
