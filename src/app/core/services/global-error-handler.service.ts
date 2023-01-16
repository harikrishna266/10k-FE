import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {

	constructor(public snackbar: MatSnackBar, private zone: NgZone) {
	}

	handleError(error: any) {
		if (error && error.error) {
			this.zone.run(() => {
				const snackBar = this.snackbar.open(error.error.message, 'Dismiss');
				snackBar.onAction().subscribe(() => {
					snackBar.dismiss();
				})
			})
		}
	}
}
