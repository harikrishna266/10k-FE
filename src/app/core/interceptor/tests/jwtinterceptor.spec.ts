import { getTestBed, TestBed} from "@angular/core/testing";
import {JwtInterceptor} from "../jwtInterceptor";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreService} from "../../services/store.service";
import {HttpHandler, HttpRequest} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../app-routing.module";

const StoreServiceMock  = {
	token: '123',
	refreshToken: '123',
}

//@ts-ignore
const request  = {
	clone:  jest.fn()
} as HttpRequest<any>;

const next = {
	handle: jest.fn()
} as HttpHandler;

describe('JwtInterceptor [LoginComponent]', () => {
	let jwt: JwtInterceptor;
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
				JwtInterceptor
 			]
		});
		injector = getTestBed();
		jwt = injector.get(JwtInterceptor);
		storeSer = TestBed.inject(StoreService);
	});

	describe('calling intercept function should append Authorization to header and call next', () => {
		let clone;
		it('should call clone', () => {
			jwt.intercept(request, next);
			expect(request.clone).toHaveBeenCalledWith({
				setHeaders: {
					Authorization: 'Bearer 123',
					'x-refresh': '123'
				}
			});
			expect(next.handle).toHaveBeenCalledTimes(1);
		})

	})
})
