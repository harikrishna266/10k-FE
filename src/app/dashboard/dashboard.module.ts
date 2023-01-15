import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ServicesModule} from "../core/services/services.module";

const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: '**',
		redirectTo: '/dashboard'
	}
]

@NgModule({
	declarations: [
		DashboardComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ServicesModule,
		RouterModule.forChild(routes)
	]
})
export class DashboardModule {
}
