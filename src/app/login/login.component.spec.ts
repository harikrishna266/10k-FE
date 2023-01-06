import {ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {LoginComponent} from "./login.component";
import {UserService} from "../core/services/user.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../app-routing.module";
import {SharedModule} from "../core/shared/shared.module";
import {MaterialModule} from "../core/material.module";
import {By} from "@angular/platform-browser";
import {of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";

const setFormValid = (form: FormGroup) => {
	form.patchValue(validLoginCred)
	form.updateValueAndValidity();
	return form;
}
const setFormInValid = (form: FormGroup) => {
	form.patchValue({
		email: '',
		password: ''
	})
	form.updateValueAndValidity();
	return form;
}

let setFieldInvalid = (field: string, value = "", form: FormGroup): FormControl => {
	const formElem = form.get(field) as FormControl;
	formElem.setValue(value);
	formElem.updateValueAndValidity();
	form.updateValueAndValidity();
	return formElem;
}
let mockRouter = {
	navigate: jest.fn(),
	routerState: {
		root: ''
	}
}


describe('Login form [LoginComponent]', () => {
	let fixture: ComponentFixture<LoginComponent>;
	let component: LoginComponent;
	let userSer: UserService;
	let userMockService = {
		login: jest.fn()
	};

	let fb: FormBuilder;
	let form: FormGroup;
	let router: Router;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				HttpClientTestingModule,
				RouterTestingModule.withRoutes(routes),
				SharedModule,
				MaterialModule,
				CommonModule
			],
			providers: [
				{provide: UserService, useValue: userMockService},
				// { provide: Router, useValue: mockRouter},
			],
			declarations: [
				LoginComponent
			]
		})
		fixture = TestBed.createComponent(LoginComponent);
		fb = TestBed.inject(FormBuilder);
		component = fixture.componentInstance;
		userSer = TestBed.inject(UserService);
		router = TestBed.inject(Router);

	})

	describe('Check Setup and Titles', () => {
		describe('ngOnInit', () => {
			let createFormSpy: any;
			beforeEach(() => {
				createFormSpy = jest.spyOn(component, 'createForm');
			})
			it('SHOULD be created', () => {
				expect(fixture).toBeDefined();
				expect(component.apiInProgress).toBe(false);
			})
			it('SHOULD create form | createForm method be called', () => {
				component.ngOnInit();
				expect(createFormSpy).toBeCalledTimes(1);
			})

			it('SHOULD have title Login', () => {
				const h3 = fixture.debugElement.query(By.css('h3'));
				expect(h3.nativeElement.textContent).toBe('Login');
			})
		})
	});

	describe('Inside Form Creation', () => {
		beforeEach(() => {
			component.ngOnInit();
			form = component.form;
		})

		describe('form should be created', () => {
			let group: any;
			beforeEach(() => {
				group = jest.spyOn(fb, 'group');
			});

			it('it should call the create group function of formbuilder', () => {
				component.ngOnInit();
				expect(group).toHaveBeenCalledTimes(1);
			})

			describe('it should return the following form controls', () => {
				it('password', () => {
					component.ngOnInit();
					const form = component.getFormControl('password');
					expect(form).toBeDefined();
					expect(form instanceof FormControl).toBeTruthy()

				});
				it('email', () => {
					const form = component.getFormControl('email');
					expect(form).toBeDefined();
					expect(form instanceof FormControl).toBeTruthy()
				});
			})
		})
		describe('Verify form fields ', () => {

			describe('email', () => {
				it('email is mandatory', () => {
					expect(setFieldInvalid('email', '', form).valid).toBe(false)
				});
				it('Valid email', () => {
					expect(setFieldInvalid('email', 'email@gmail.com', form).valid).toBe(true)
				});
				it('Invalid email', () => {
					expect(setFieldInvalid('email', 'email@', form).valid).toBe(false)
				});
			});
			describe('password', () => {
				it('password is mandatory', () => {
					expect(setFieldInvalid('password', '', form).valid).toBe(false)
				});
				it('password is mandatory', () => {
					expect(setFieldInvalid('password', '123123', form).valid).toBe(true)
				});
			});

		})
		describe('Submit button', () => {
			it('form to be invalid', () => {
				expect(setFormInValid(form).valid).toBe(false)
			});
			it('SHOULD be disabled', () => {
				expect(setFormInValid(form).valid).toBe(false)
				fixture.detectChanges();
				const buttons = fixture.debugElement.query(By.css('.register__button'));
				expect(buttons.nativeElement.attributes.disabled).toBeTruthy();
			});
			it('form to be invalid', () => {
				expect(setFormValid(form).valid).toBe(true)
			});
			it('SHOULD be enabled', () => {
				fixture.detectChanges();
				const buttons = fixture.debugElement.query(By.css('.register__button'));
				expect(buttons.nativeElement.attributes.disabled).toBeTruthy();
			})
		})

	});
	describe('Submit login form', () => {
		let loginApi: any;
		let form: FormGroup;
		beforeEach(() => {
			loginApi = jest.spyOn(userSer, 'login').mockReturnValue(of(validLoginResponse));
			component.ngOnInit();
			form = component.form;
		});
		it('SHOULD NOT call login api if form is not valid', () => {
			expect(setFormInValid(form).valid).toBe(false);
			expect(component.submit()).toBe(undefined);
			expect(loginApi).not.toHaveBeenCalled();
		})
		it('SHOULD call login API if form is valid', fakeAsync(() => {
			expect(setFormValid(form).valid).toBe(true);
			component.submit();
			expect(loginApi).toHaveBeenCalled();
		}))
	})
	describe('AFTER api response', () => {
		let loginApi: any;
		let form: FormGroup;

		describe('200-OK Response', () => {
			let validLogin: any;
			beforeEach(() => {
				loginApi = jest.spyOn(userSer, 'login').mockReturnValue(of(validLoginResponse));
				validLogin = jest.spyOn(component, 'validLogin');
				component.ngOnInit();
				form = component.form;
			});
			it('it should call the valid login method', fakeAsync(() => {
				expect(setFormValid(form).valid).toBe(true);
				component.submit();
				expect(loginApi).toBeCalledWith(form.value);
				expect(validLogin).toBeCalledWith(validLoginResponse);
			}))
		})
		describe('4XX Response', () => {
			let showErrorMessage: any;
			let validLogin: any;
			beforeEach(() => {
				loginApi = jest.spyOn(userSer, 'login').mockReturnValue(throwError(error));
				showErrorMessage = jest.spyOn(component, 'showErrorMessage');
				validLogin = jest.spyOn(component, 'validLogin');
				component.ngOnInit();
				form = component.form;
			});
			it('it should call the error method', fakeAsync(() => {
				expect(setFormValid(form).valid).toBe(true);
				component.submit();
				expect(loginApi).toBeCalledWith(form.value);
				expect(validLogin).not.toHaveBeenCalled();
				expect(showErrorMessage).toBeCalledWith(error)
			}))
		})
	})

	describe('A valid user found', () => {
		let navigateSpy: any;
		beforeEach(() => {
			navigateSpy = jest.spyOn(router, 'navigate');
			component.validLogin(validLoginResponse);
		})

		it('process user info', () => {
			fixture.detectChanges();
			expect(component.apiInProgress).toBe(false);
			expect(component.storeSer.token).toBe('token');
			expect(component.storeSer.refreshToken).toBe('refreshToken');
			expect(navigateSpy).toHaveBeenCalledWith(['/']);
		})
	})
	describe('An invalid user found', () => {
		it('it  should set errors', () => {
			component.showErrorMessage('some')
			expect(component.errors).toBe('some');
		})
	})
})


const validLoginResponse = {
	accessToken: 'token',
	refreshToken: 'refreshToken',
	id: '1',
	name: 'name',
	email: 'email',
}


const validLoginCred = {
	email: 'email@gmail.com',
	password: 'password'
}

const error: HttpErrorResponse = {
	status: 401,
	message: ''
} as HttpErrorResponse;
