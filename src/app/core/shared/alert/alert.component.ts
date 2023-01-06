import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export type AlertData = {
	title: string;
	messageType: 'warn' | 'error' | 'info' | 'success';
	messages: { message: string }[]
}

@Component({
	selector: 'ttc-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],

})
export class AlertComponent {

	messages: { message: string }[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public alert: AlertData,
		public dialogRef: MatDialogRef<AlertComponent>
	) {
		this.messages = alert.messages;
	}

	close() {
		this.dialogRef.close();
	}

}
