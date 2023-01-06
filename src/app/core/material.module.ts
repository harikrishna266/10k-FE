import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSnackBarModule} from '@angular/material/snack-bar';


export const materialModules = [
	MatDialogModule,
	OverlayModule,
	MatSnackBarModule
];

@NgModule({
	imports: [
		CommonModule,
		...materialModules
	],
	exports: [
		...materialModules,
	],
})

export class MaterialModule {
}
