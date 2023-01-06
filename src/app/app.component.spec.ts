import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {RouterLinkDirectiveStub} from "../testing";
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterOutletStubComponent} from "./stubs/router-outlet.stub.spec";


let fixture: ComponentFixture<AppComponent>;
let comp: AppComponent;
let routerLinks: RouterLinkDirectiveStub;
describe('AppComponent & TestModule', () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [],
			declarations: [
				AppComponent,
				RouterLinkDirectiveStub,
				RouterOutletStubComponent
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(AppComponent);
				comp = fixture.componentInstance;
			});
	}));

	let routerOutlet: DebugElement[];
	beforeEach(() => {
		fixture.detectChanges();
		routerOutlet = fixture.debugElement.queryAll(By.directive(RouterOutletStubComponent));
	});


	it('can instantiate the component', () => {
		expect(comp).not.toBeNull();
	});
	;

	it('it should have a router outlet that serves as the main container of the application', () => {
		expect(routerOutlet.length).toBe(1);
	})

	it('it should have a div with a class of body', () => {
		const body = fixture.debugElement.queryAll(By.css('.body'));
		expect(body.length).toBe(1);
	})


});
