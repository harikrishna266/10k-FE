import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../core/shared/shared.module";
import { FormsModule} from "@angular/forms";
import {ServicesModule} from "../core/services/services.module";
import {UserService} from "../core/services/user.service";
import {DashboardComponent, Queryparams} from "./dashboard.component";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {of} from "rxjs";
import {RunHelpers, TestScheduler} from "rxjs/internal/testing/TestScheduler";
import {routes} from "../app-routing.module";

const UserServiceMock = {}


describe('Dashboard| Dashboard Component', () => {
	let fixture: ComponentFixture<DashboardComponent>;
	let component: DashboardComponent;
	let activatedRoute: ActivatedRoute;
	let router: Router;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				SharedModule,
				FormsModule,
				ServicesModule,
				RouterTestingModule.withRoutes(routes),
			],
			providers: [
				{provide: UserService, useValue: UserServiceMock},
				{
					provide: ActivatedRoute,
					useValue: {
						queryParams: of(
							convertToParamMap({skip: 0, limit: 1, search: ''}),
							convertToParamMap({skip: 0, limit: 2, search: ''}),
							convertToParamMap({skip: 0, limit: 3, search: ''})
						)
					}
				},
				{
					provide: Router,
					useValue: {
						navigate: jest.fn()
					}
				}
			],
			declarations: [
				DashboardComponent
			]
		})
		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		activatedRoute = TestBed.inject(ActivatedRoute);
		router = TestBed.inject(Router);
	})

	describe('Initial set up', () => {
		let watchUrlParams: any;
		beforeEach(() => {
			watchUrlParams = jest.spyOn(component, 'watchUrlParams')
		})

		it('SHOULD be created', () => {
			expect(fixture).toBeDefined();
		})
		it('Should have title of Photos', () => {
			const h3 = fixture.debugElement.query(By.css('h1'));
			expect(h3.nativeElement.textContent).toBe('Photos');
		})

		it('Should set queryParam object to the base value', () => {
			expect(component.queryParams).toEqual(expect.objectContaining({'skip': 0, 'limit': 30, 'search': ''}))
		})

		it('Total Images to be set to ZERO', () => {
			expect(component.totalImages).toEqual(0)
		})

		it('After View Init it should start watching changes in URL', () => {
			component.ngAfterViewInit();
			expect(watchUrlParams).toHaveBeenCalledTimes(1);
		})
	})
	describe('Watch for Url changes', () => {
		let queryParamsMock: any;

		describe('update params', () => {
			let scheduler: any;
			let searchImage: any;
			let updateParams: any;

			beforeEach(async () => {
				updateParams = jest.spyOn(component, 'updateParams');
				searchImage = jest.spyOn(component, 'searchImage')
					//@ts-ignore
					.mockReturnValueOnce(of({count: 100, images: [1]}))
					//@ts-ignore
					.mockReturnValueOnce(of({count: 10, images: [1, 2]}))
					//@ts-ignore
					.mockReturnValueOnce(of({count: 10, images: [1, 3]}));
				scheduler = new TestScheduler((actual, expected) => expect(actual).toStrictEqual(expected));
			})
			it('should call updateParams and update the params on every params change', () => {
				scheduler.run((helpers: RunHelpers) => {
					const cold = helpers.cold;
					const expectObservable = helpers.expectObservable;

					//@ts-ignore
					const source$ = cold('(a-b-c|)', activatedRoute.paramMap);

					const expectedValues = {
						a: {count: 100, images: [1]},
						b: {count: 10, images: [1, 2]},
						c: {count: 10, images: [1, 3]}
					};
					const expected$ = cold('(a|)', expectedValues);

					component.watchUrlParams();
					const results$ = component.image$;
					expectObservable(results$).toEqual(expected$);
				})
				expect(searchImage).toHaveBeenCalledTimes(1);
				expect(updateParams).toHaveBeenCalledTimes(3);
			})

			describe('populate the basic params need to make a query', () => {
				describe('queryParams should be set to default if nothing is set', () => {
					it('It should get default setting', () => {
						component.updateParams({} as Queryparams);
						expect(component.queryParams).toEqual(
							expect.objectContaining({
								"limit": 30,
								"search": "",
								"skip": 0
							})
						);
					})
					it('If limit to be 0, reassign it to 30', () => {
						component.updateParams({limit: 0} as Queryparams);
						expect(component.queryParams).toEqual(
							expect.objectContaining({ "limit": 30, "search": "", "skip": 0 })
						)
					})
				})

			})

			describe('make api calls', () => {

			})

		})
	})

	describe('update Url when params changes', () => {
		describe('Update on search', () => {
			let routerSpy: any;
			beforeEach(async () => {
				routerSpy = jest.spyOn(router, 'navigate');
			})
			it('should update url', () => {
				component.updateParams({} as Queryparams);
				component.updateUrlParams();
				expect(routerSpy).toHaveBeenCalledTimes(1);
			})
		})
		describe('Update on pagination', () => {

		})
	})
});
