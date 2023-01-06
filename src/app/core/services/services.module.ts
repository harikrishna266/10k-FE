import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "./user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StoreService} from "./store.service";
import {ThemeService} from "./theme.service";
import {ImageService} from "./image.service";
import {JwtInterceptor} from "../interceptor/jwtInterceptor";
import {MaterialModule} from "../material.module";
import {RetryInterceptor} from "../interceptor/retry-interceptor";


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule
	],
	providers: [
		UserService,
		StoreService,
		ThemeService,
		ImageService,
		{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true}
	]
})
export class ServicesModule {
}
