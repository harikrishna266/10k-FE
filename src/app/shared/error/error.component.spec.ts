import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorComponent} from "./error.component";
import {FormControl, Validators} from "@angular/forms";


describe('ErrorComponent', () => {
	let component: ErrorComponent;
	let fixture: ComponentFixture<ErrorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ErrorComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.formEle = new FormControl();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show required error if the value is not set', () => {
		component.formEle.setValue('');
		component.formEle.setErrors({required: true});
		component.formEle.markAsDirty();
		fixture.detectChanges();
		const bannerElement: HTMLElement = fixture.nativeElement;
		expect(bannerElement.textContent).toContain('This field is required');
	});

	it('should show errors for minlength and maxlength', () => {
		component.formEle.setValue('');
		component.formEle.setErrors({maxlength: true});
		component.formEle.setErrors({minlength: true});
		component.formEle.markAsDirty();
		fixture.detectChanges();
		const bannerElement: HTMLElement = fixture.nativeElement;
		expect(bannerElement.textContent).toContain('Requires min of 6 and max of 10 characters');
	});


	it('should show errors for minlength and maxlength', () => {
		component.formEle.setValue('');
		component.formEle.setErrors({maxlength: true});
		component.formEle.setErrors({minlength: true});
		component.formEle.markAsDirty();
		fixture.detectChanges();
		const bannerElement: HTMLElement = fixture.nativeElement;
		expect(bannerElement.textContent).toContain('Requires min of 6 and max of 10 characters');
	});

	it('should show for email', () => {
		component.formEle.addValidators(Validators.email);
		component.formEle.setValue('hello');
		component.formEle.markAsDirty();
		fixture.detectChanges();
		const bannerElement: HTMLElement = fixture.nativeElement;
		expect(bannerElement.textContent).toContain('Please enter a valid Email');
	});


	it('should show for passwordMismatch', () => {
		component.formEle.addValidators(Validators.email);
		component.formEle.setErrors({passwordMismatch: true});
		component.formEle.markAsDirty();
		fixture.detectChanges();
		const bannerElement: HTMLElement = fixture.nativeElement;
		expect(bannerElement.textContent).toContain('Passwords does not match');
	});


});
