import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler{

	constructor(public snackbar: MatSnackBar) {
	}

	showError() {

	}

	handleError(error: any) {
		this.snackbar.open(error.message, '', {
			duration: 3000
		});
	}
}
