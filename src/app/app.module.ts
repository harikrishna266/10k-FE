import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./auth/auth.module";
import {GlobalErrorHandlerService} from "./core/services/global-error-handler.service";

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AuthModule
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandlerService
		}
	],
	declarations: [
		AppComponent
	],

	bootstrap: [AppComponent],
})
export class AppModule {
}
