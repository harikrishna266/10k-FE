import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {

	constructor(public snackbar: MatSnackBar) {
	}

	handleError(error: any) {
		if (error && error.error) {
			this.snackbar.open(error.error.message, '', {
				duration: 3000
			});
		}
	}
}
