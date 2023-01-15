import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorComponent} from "./error/error.component";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {ConfirmBoxComponent} from "./confirm-box/confirm-box.component";
import {AlertComponent} from "./alert/alert.component";
import {CheckBoxComponent} from "./check-box/check-box.component";
import {FileUploadProgressBarComponent} from "./file-upload-progress-bar/file-upload-progress-bar.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {DirectiveModule} from "../core/directives/directive.module";
import {MaterialModule} from "../core/material.module";
import {PhotoCardComponent} from "./photo-card/photo-card.component";

const sharedComponents = [
	ErrorComponent,
	ProgressBarComponent,
	ConfirmBoxComponent,
	AlertComponent,
	CheckBoxComponent,
	FileUploadProgressBarComponent,
	FileUploadComponent,
	PhotoCardComponent
]

@NgModule({
	declarations: [...sharedComponents],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		DirectiveModule,
		MaterialModule
	],
	exports: [...sharedComponents]
})
export class SharedModule {
}
