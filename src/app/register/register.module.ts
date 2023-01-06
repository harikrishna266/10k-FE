import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../core/material.module";
import {SharedModule} from "../core/shared/shared.module";

const routes: Routes = [
	{
		path: '',
		component: RegisterComponent
	}
]

@NgModule({
	declarations: [
		RegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MaterialModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class RegisterModule {
}
