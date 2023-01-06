import {fakeAsync, getTestBed, TestBed} from "@angular/core/testing";
import {IsUserLoggedInGuard} from "./is-user-logged-in.guard";
import {StoreService} from "../services/store.service";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {routes} from "../../app-routing.module";

let StoreServiceMock = {}

describe('Guards', () => {

	let guard!: IsUserLoggedInGuard;
	let injector: TestBed;
	let service: IsUserLoggedInGuard;
	let storeSer: StoreService;
	let router: Router;
	let navigate: any;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes(routes),
			],
			providers: [
				IsUserLoggedInGuard,
				{
					provide: StoreService, userValue: StoreServiceMock
				},

			]
		})
		injector = getTestBed();
		service = injector.inject(IsUserLoggedInGuard);
		storeSer = injector.inject(StoreService);
		guard = injector.inject(IsUserLoggedInGuard);
		router = injector.inject(Router);
		navigate = jest.spyOn(router, 'navigate');
	})

	describe('canActivateChild', () => {
		describe('Logged in| TOKEN PRESENT', () => {

			beforeEach(() => {
				storeSer.token = 'token';

			})

			it('should return a TRUE', () => {
				const router = {} as ActivatedRouteSnapshot;
				const state = {} as RouterStateSnapshot;
				expect(service.canActivateChild(router, state)).toBe(true);
				expect(navigate).toBeCalledTimes(0);
			})
		})

		describe('Logged OUT| TOKEN ABSENT', () => {
			beforeEach(() => {
				storeSer.token = '';
			})

			it('should return type of  URL TREE and should be having login link', fakeAsync(() => {
				const router = {} as ActivatedRouteSnapshot;
				const state = {} as RouterStateSnapshot;
				const response = service.canActivateChild(router, state);
				expect(response instanceof   Promise).toBe(true);
				expect(navigate).toBeCalledWith(['./login']);
			}))
		})
	})


	describe('canActivate', () => {
		describe('Logged in| TOKEN PRESENT', () => {
			beforeEach(() => {
				storeSer.token = 'token';
			})
			describe('Prevent user from accessing login or register link', () => {
				it('access login | redirect to dashboard', fakeAsync(() => {
					const router = {} as ActivatedRouteSnapshot;
					const state = {url: '/login'} as RouterStateSnapshot;
					const response = service.canActivate(router, state);
					expect(response instanceof   Promise).toBe(true);
					expect(navigate).toBeCalledWith(['./dashboard']);
				}))
				it('access register | redirect to dashboard', fakeAsync(() => {
					const router = {} as ActivatedRouteSnapshot;
					const state = {url: '/register'} as RouterStateSnapshot;
					const response = service.canActivate(router, state);
					expect(response instanceof   Promise).toBe(true);
					expect(navigate).toBeCalledWith(['./dashboard']);
				}))

				describe('access dashboard', () => {
					it('Should return true', fakeAsync(() => {
						const router = {} as ActivatedRouteSnapshot;
						const state = {url: '/dashboard'} as RouterStateSnapshot;
						expect(service.canActivate(router, state)).toBeTruthy();
						expect(navigate).toBeCalledTimes(0);
					}));
				})
			})
		})
	})
	describe('Logged OUT| TOKEN ABSENT', () => {
		beforeEach(() => {
			storeSer.token = '';
		})

		describe('canActivate', () => {
			it('it should return url and NOT TRUE', () => {
				const router = {} as ActivatedRouteSnapshot;
				const state = {} as RouterStateSnapshot;
				const response = service.canActivateChild(router, state)
				expect(response instanceof   Promise).toBe(true);
				expect(navigate).toBeCalledWith(['./login']);
 			})

			it('it should return url and NOT TRUE', () => {
				const router = {} as ActivatedRouteSnapshot;
				const state = {} as RouterStateSnapshot;
				const response = service.canActivateChild(router, state)
				expect(response instanceof   Promise).toBe(true);
				expect(navigate).toBeCalledWith(['./login']);
 			})
 		})
	})
})
