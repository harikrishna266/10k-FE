import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {RouterModule} from "@angular/router";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {ServicesModule} from "../core/services/services.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
	declarations: [
		AuthComponent,
		SideBarComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		ServicesModule,
		SharedModule
	]
})
export class AuthModule {
}
