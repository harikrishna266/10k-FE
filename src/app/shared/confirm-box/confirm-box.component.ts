import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export type ConfirmData = {
	title: string;
	message: string;
 }

@Component({
	selector: 'ttc-confirm-box',
	templateUrl: './confirm-box.component.html',
	styleUrls: ['./confirm-box.component.scss'],
})
export class ConfirmBoxComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public confirmData: ConfirmData,
		public dialogRef: MatDialogRef<ConfirmBoxComponent>
		) {
	}

	ngOnInit(): void {
	}

	close(status: boolean) {
		this.dialogRef.close(status)
	}

}
