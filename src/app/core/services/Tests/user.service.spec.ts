import {getTestBed, TestBed, waitForAsync} from '@angular/core/testing';

import {UserService} from '../user.service';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../../environments/environment";

describe('UserService', () => {
	let service: UserService;
	let httpMock: HttpTestingController;
	let injector: TestBed;
	const userInfo = {
		name: 'joe'
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: [

			]
		});
		injector = getTestBed();
		httpMock = injector.get(HttpTestingController);
		service = injector.get(UserService)
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return user details on calling the details api', waitForAsync(() => {
			const service = TestBed.get(UserService);
			service.userDetails()
				.subscribe({
					next: (data: any) => {
						expect(data).toMatchObject(userInfo);
					}
				});
			const req = httpMock.expectOne(`${environment.server}/user/details/`);
			expect(req.request.method).toBe('GET');
			req.flush(userInfo, {status: 200, statusText: 'success'});
		}
	));


	it('should return user details on calling the details api', waitForAsync(() => {
			const service = TestBed.get(UserService);
			service.userDetails()
				.subscribe({
					error: (res: HttpErrorResponse) => {
						expect(res).not.toBeNull();
					}
				});
			httpMock.expectOne(`${environment.server}/user/details/`)
				.flush({'data': 'hello world'}, {status: 500, statusText: 'Server error'});
		}
	));

	it('should call call register api', waitForAsync(() => {
			const service = TestBed.get(UserService);
			service.register()
				.subscribe({
					next: (data: any) => {
						expect(data).toMatchObject(userInfo);
					}
				});
			const req = httpMock.expectOne(`${environment.server}/register`)
			expect(req.request.method).toBe('POST');
			req.flush(userInfo, {status: 200, statusText: 'success'});
		}
	))

})

