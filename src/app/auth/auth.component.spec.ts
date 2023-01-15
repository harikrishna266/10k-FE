import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {SideBarComponent} from "./side-bar/side-bar.component";
import {RouterTestingModule} from "@angular/router/testing";
import {ServicesModule} from "../core/services/services.module";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

describe('AuthComponent', () => {
	let component: AuthComponent;
	let fixture: ComponentFixture<AuthComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AuthComponent,
				SideBarComponent,

			],
			imports: [
				RouterTestingModule,
				ServicesModule,
				SharedModule,
				CommonModule
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
