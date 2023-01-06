import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {User} from "../types/user.type";
import {StoreService} from "../core/services/store.service";

@Component({
	selector: 'tck-login',
	templateUrl: './login.component.html',
	styleUrls: ['../register/register.component.scss']
})
export class LoginComponent implements OnInit {

	apiInProgress = false;
	form!: FormGroup;
	token: any = '';
	errors!: string;

	constructor(
		public fb: FormBuilder,
		public userSer: UserService,
		private router: Router,
		public storeSer: StoreService,
	) {}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.form = this.fb.group({
			password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
			email: ['', [Validators.required, Validators.email]],
		});
	}

	getFormControl(name: string): FormControl {
		return this.form.get(name) as FormControl;
	}

	submit(): void {
		this.apiInProgress = true;
		if(!this.form.valid) {
			return;
		}
		this.userSer.login(this.form.value).subscribe(
			(login: User) => this.validLogin(login),
			(e) => this.showErrorMessage(e)
		);
	}

	validLogin(user: User): void {
		this.apiInProgress = false;
		this.storeSer.token = user.accessToken as string;
		this.storeSer.refreshToken = user.refreshToken as string;
		this.router.navigate(['/']);
	}


	showErrorMessage(error: string) {
		this.errors = error;
	}
}

export type loginResponse = { token: string, refreshToken: string };
