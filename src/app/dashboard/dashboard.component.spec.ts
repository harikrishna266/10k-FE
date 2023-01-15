import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {ServicesModule} from "../core/services/services.module";
import {UserService} from "../core/services/user.service";
import {DashboardComponent, Queryparams} from "./dashboard.component";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {of} from "rxjs";
import {RunHelpers, TestScheduler} from "rxjs/internal/testing/TestScheduler";
import {routes} from "../app-routing.module";
import {FileUploadComponent} from "../shared/file-upload/file-upload.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Image} from "../types/image.type";



describe('Dashboard| Dashboard Component', () => {
	let fixture: ComponentFixture<DashboardComponent>;
	let component: DashboardComponent;
	let activatedRoute: ActivatedRoute;
	let router: Router;
	let userSer: UserService;
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
				UserService,
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
				},
				{provide: MAT_DIALOG_DATA, useValue: []},

			],
			declarations: [
				DashboardComponent
			]
		})
		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		activatedRoute = TestBed.inject(ActivatedRoute);
		userSer = TestBed.inject(UserService);
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
			component.ngOnInit();
			expect(watchUrlParams).toHaveBeenCalledTimes(1);
		})
	})
	describe('Watch for Url changes', () => {

		describe('update params', () => {
			let scheduler: any;
			let searchImage: any;
			let updateParams: any;
			let updatePagination: any;

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
				updatePagination = jest.spyOn(component, 'updatePagination')
			})
			it('should call updateParams and update the params on every params change', () => {
				scheduler.run((helpers: RunHelpers) => {
					const cold = helpers.cold;
					const expectObservable = helpers.expectObservable;

					//@ts-ignore
					 cold('(a-b-c|)', activatedRoute.paramMap);

					const expectedValues = {
						a: {count: 100, images: [1]},
						b: {count: 10, images: [1, 2]},
						c: {count: 10, images: [1, 3]}
					};
					// even-though there are 3 request updating the url params, it wil only fetch 1 results because
					// debounce will filter all request and send just 1 image array
					const expected$ = cold('(a|)', expectedValues);

					component.watchUrlParams();
					const results$ = component.image$;
					//@ts-ignore
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
							expect.objectContaining({"limit": 30, "search": "", "skip": 0, id: expect.any(Number)})
						)
					})
				})
			})

			describe('Check search', () => {
				let updateSearch: any;
				let inputEle: any;
				beforeEach(async () => {
					updateSearch = jest.spyOn(component, 'updateSearch')
						//@ts-ignore
						.mockReturnValueOnce(of({count: 100, images: [1]}))
					//	component.queryParams.search = 'search';
					inputEle = fixture.debugElement.query(By.css('.dash__header__search__input'))
				})
				//i wasn't able to successfully trigger model-change

				describe('updateSearch should reset skip and params and update search', () => {
					let updateParams: any;
					let updateUrlParams: any;
					let resetParams: any;
					beforeEach(() => {
						component.queryParams.search = 'search';
						updateParams = jest.spyOn(component, 'updateParams')
						updateUrlParams = jest.spyOn(component, 'updateUrlParams')
						resetParams = jest.spyOn(component, 'resetParams')
						component.updateSearch(keyBoardEvent);
					})
					it('reset all params except search', () => {
						expect(component.queryParams).toStrictEqual({
							skip: 0,
							limit: 30,
							search: 'search',
							id: expect.any(Number)
						})
					})
					it('it should call updateParams', () => {
						component.updateSearch(keyBoardEvent);
						expect(resetParams).toBeCalled();
						expect(updateParams).toBeCalledWith({
							skip: 0,
							limit: 30,
							search: 1,
							id: expect.any(Number)
						});
						expect(updateUrlParams).toBeCalled();
					})
				})
			})

			describe('Click on upload Button should open up upload component', () => {
				let uploadButton: any;
				let openUpload: any;
				let open: any;
 				let updateParams: any;
				beforeEach(() => {
					uploadButton = fixture.debugElement.query(By.css('.dash__add'))
					openUpload = jest.spyOn(component, 'openUpload')
					updateParams = jest.spyOn(component, 'updateParams')
					open = jest.spyOn(component.dial, 'open')

				})
				it('click on upload should open modal', fakeAsync(() => {
					component.ngOnInit();
					uploadButton.nativeElement.dispatchEvent(new Event('click'));
					expect(openUpload).toBeCalled();
					expect(open).toBeCalledWith(FileUploadComponent, {
						width: '600px',
						height: 'auto',
						panelClass: 'ttc-modal-box'
					});
					tick(1000);
				}))
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
	})

	describe('Set random height to images', () => {
		it('every image should have the class', () => {
			const classname = component.getRandomHeight([{} as Image]);
			expect(classname).toStrictEqual([{classname: expect.any(String)}])
		})
	});

	describe('get pagination numbers', () => {
		it('should produce an array of pages', () => {
			component.updatePagination([{count: 60}])
			component.queryParams = {
				limit: 30,
				skip: 0,
				search: '',
				id: 123
			}
			expect(component.paginationArray.length).toBe(2);
		})
	})

	describe('click on pagination should go to that page', () => {
		let updateParams: any;
		let updateUrlParams: any;
		beforeEach(() => {
			updateParams = jest.spyOn(component, 'updateParams')
			updateUrlParams = jest.spyOn(component, 'updateUrlParams')

		})
		it('should reset query params', () => {
			component.queryParams = {
				limit: 30,
				skip: 0,
				search: '',
				id: 123
			}
			component.updatePagination([{count: 60}])
			component.goToPage(2);
			expect(component.queryParams.skip).toBe(30);
			expect(updateParams).toHaveBeenCalledWith({
				limit: 30,
				skip: 30,
				search: '',
				id: 123
			});
			expect(updateUrlParams).toHaveBeenCalled();
		})
	})

 });

//@ts-ignore
const keyBoardEvent = {target: {value: 1}} as KeyboardEvent
