import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {RegisterComponent} from "./register.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from "../shared/shared.module";
import {UserService} from "../core/services/user.service";
import {MaterialModule} from "../core/material.module";
import {By} from "@angular/platform-browser";
import {of, throwError} from "rxjs";
import {ProgressBarComponent} from "../shared/progress-bar/progress-bar.component";
import {Router} from "@angular/router";
import {routes} from "../app-routing.module";
import {HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

const setFormValid = (form: FormGroup) => {
	form.patchValue({
		'name': 'hari',
		'email': 'email@gmail.com',
		'password': '123123',
		'confirm_password': '123123'
	})
	form.updateValueAndValidity();
}
const setFormInValid = (form: FormGroup) => {
	form.patchValue({})
	form.updateValueAndValidity();
}

let setFieldInvalid = (field: string, value = "", form: FormGroup): FormControl => {
	const formElem = form.get(field) as FormControl;
	formElem.setValue(value);
	formElem.updateValueAndValidity();
	form.updateValueAndValidity();
	return formElem;
}

describe('Registration form [RegisterComponent]', () => {
	let fixture: ComponentFixture<RegisterComponent>;
	let component: RegisterComponent;
	let userSer: UserService;
	let router: Router;
	let progressbar: any
	let finishedRegistration: any;
	let userMockService = {
		register: jest.fn()
	};
	let fb: FormBuilder;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				HttpClientTestingModule,
				RouterTestingModule.withRoutes(routes),
				SharedModule,
				MaterialModule
			],
			providers: [
				{provide: UserService, useValue: userMockService},
			],
			declarations: [RegisterComponent]
		})
		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		userSer = TestBed.inject(UserService);
		router = TestBed.inject(Router);

		progressbar = fixture.debugElement.queryAll(By.directive(ProgressBarComponent));
		finishedRegistration = jest.spyOn(component, 'finishedRegistration');

	})

	describe('Setup of Register component', () => {
		describe('ngOnInit', () => {
			it('SHOULD invoke createForm', () => {
				const createForm = jest.spyOn(component, 'createForm');
				component.ngOnInit();
				expect(createForm).toBeCalledTimes(1);
			})
		})
	});
	describe('Setup of Register form', () => {
		let form: FormGroup;
		let createGroup: any;
		beforeEach(() => {
			component.ngOnInit();
			form = component.form;
			fb = TestBed.inject(FormBuilder);
			createGroup = jest.spyOn(component.fb, 'group')

		})

		describe('Form Fields', () => {

			it('verify all the form fields', () => {
				component.createForm();
				expect(createGroup).toBeCalledTimes(1);
			});
		})

		describe('INVALID form verifications', () => {
			it('Submit button should be disabled', () => {
				setFormInValid(form);
				const buttons = fixture.debugElement.query(By.css('.register__button'));
				expect(buttons.nativeElement.attributes.disabled).toBeFalsy()
				expect(form.valid).toBe(false);
			})

			describe('Form Validations', () => {
				beforeEach(() => {
					component.ngOnInit();
				})
				describe('name', () => {
					it('name is mandatory', () => {
						setFieldInvalid('name', '', form);
						expect(form.get('name')?.valid).toBe(false)
					})
				});
				describe('password', () => {
					it('password is mandatory', () => {
						expect(setFieldInvalid('password', '2', form).valid).toBe(false);
					})
					it('password should have a minimum value of 5', () => {
						expect(setFieldInvalid('password', '123', form).hasError('minlength')).toBe(true);
					});

					it('password should have a minimum value of 10', () => {
						expect(setFieldInvalid('password', '123123123123123', form).hasError('maxlength')).toBe(true);
					});
				})
				describe('confirm password should always look to match the password and should any other errors', () => {
					it('check if the password matches', () => {
						expect(setFieldInvalid('confirm_password', '1', form).hasError('passwordMismatch')).toBe(true);
					})
				})
				describe('email', () => {
					it('password should have a valid email', () => {
						expect(setFieldInvalid('email', '123', form).hasError('email')).toBe(true);
					})
				})
				describe('Full form validations', () => {
					it('password === confirm password', () => {
						setFieldInvalid('password', '1231231', form);
						setFieldInvalid('confirm_password', 'abcd', form);
						expect(form.hasError('passwordMismatch')).toBe(true);
					})
				})
			})


		})
		describe('VALID form verifications', () => {
			beforeEach(() => {
				component.ngOnInit();
				setFormValid(component.form);
			})

			it('Activate submit button', () => {
				const buttons = fixture.debugElement.query(By.css('.register__button'));
				expect(buttons.nativeElement.attributes.disabled).not.toBeDefined()
				expect(true).toBe(component.form.valid);
			});
		});

		describe('Repeat password validator', () => {
			describe('password === confirm_password', () => {
				it('should return null', () => {
					component.ngOnInit();
					form.patchValue({password: '123123', confirm_password: '123123'});
					expect(component.repeatPasswordValidator(form)).toBe(null);
				})
			})
			describe('password !== confirm_password', () => {
				it('should return passwordMismatch', () => {
					component.ngOnInit();
					form.patchValue({password: '123123', confirm_password: '123112323'});
					expect(component.repeatPasswordValidator(form)).toEqual(
						expect.objectContaining({
							passwordMismatch: true
						})
					);
				})
			})
		})

	})
	describe('Submit Registration form', () => {
		let form: FormGroup;
		let registerApi: any
		beforeEach(() => {
			component.ngOnInit();
			form = component.form;
			//@ts-ignore;
			registerApi = jest.spyOn(userSer, 'register').mockReturnValue(of(userResponse));
		})

		it('SHOULD NOT call register api if form is not valid', () => {
			setFormInValid(form);
			component.submit();
			expect(registerApi).not.toHaveBeenCalled();
		})

		it('SHOULD call register API if form is valid', () => {
			setFormValid(form);
			component.submit();
 			expect(registerApi).toHaveBeenCalledWith(form.value);
		});
	})

	describe('AFTER api response', () => {
		describe('registration api called', () => {
			let routerSpy: any;
			let form: FormGroup;
			beforeEach(() => {
				routerSpy = jest.spyOn(router, 'navigate');
				component.ngOnInit();
				form = component.form;
			})
			describe('SUCCESS', () => {
				let registerApi: any;
				beforeEach(() => {
					registerApi = jest.spyOn(userSer, 'register').mockReturnValue(of(userResponse));
				})
				it('it should navigate  to  login page', fakeAsync(() => {
					setFormValid(form);
					component.submit();
					expect(finishedRegistration).toHaveBeenCalledWith();
					expect(routerSpy).toHaveBeenCalledWith(['/login'])
				}));
			})

			describe('ERROR', () => {
				let registerApiWithError: any;
				let form: any;
				let registrationError: any;
				let throwErrorCall: any;
				beforeEach(() => {
					component.ngOnInit();
					registerApiWithError = jest.spyOn(userSer, 'register').mockReturnValue(throwError(error));
					registrationError = jest.spyOn(component, 'registrationError');
					throwErrorCall = jest.spyOn(component, 'throwError').mockImplementation(() => {});
					form = component.form
				});
				it('it should call registrationError', fakeAsync(() => {
					setFormValid(form);
					component.submit();
					expect(registerApiWithError).toHaveBeenCalledWith(form.value);
					expect(component.registrationError).toHaveBeenCalledWith(error);
				}));
				it('it  should set errors', () => {
					const error = new HttpErrorResponse({ status: 401, url: environment.server });
					component.registrationError(error)
					expect(throwErrorCall).toBeCalledTimes(1)
				})
			})

		})

	})


})

const error: HttpErrorResponse = {
	status: 401,
	message: ''
} as HttpErrorResponse;

export const userResponse = {
	name: 'hari',
	password: 'adminadmin',
	confirm_password: 'adminadmin',
	email: 'hari@gmail.com',
	id: '1'
};

