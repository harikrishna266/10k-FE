import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

import {Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {User} from "../types/user.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
	selector: 'ttc-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	apiInProgress = false;
	form!: FormGroup;
	errors!: string;

	constructor(
		public fb: FormBuilder,
		public dialog: MatDialog,
		private router: Router,
		public userSer: UserService
	) {
	}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
			confirm_password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
			email: ['', [Validators.required, Validators.email]],
		}, {validators: this.repeatPasswordValidator});

	}

	repeatPasswordValidator(group: FormGroup) {
		const mismatch = group.get('password')?.value !== group.get('confirm_password')?.value;
		const setError = mismatch ? {'passwordMismatch': true} : null;
		(group.get('confirm_password') as FormControl).setErrors(setError);
		return mismatch ? {passwordMismatch: mismatch} : null;
	}

	getFormControl(name: string): FormControl {
		return this.form.get(name) as FormControl;
	}

	submit() {
		if (!this.form.valid) {
			return;
		}
		this.apiInProgress = true;
		this.userSer.register(this.form.value)
			.subscribe(
				(user: User) => this.finishedRegistration(),
				(error: any) => this.registrationError(error)
			);
	}

	finishedRegistration() {
		this.apiInProgress = false;
		this.router.navigate(['/login']);
	}

	registrationError(error: any) {
		this.apiInProgress = false;
		 this.throwError(error);
	}

	throwError(e: any) {
		throw new HttpErrorResponse(e);
	}

}


