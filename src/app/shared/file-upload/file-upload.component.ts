import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

declare const window: any;

export interface FileHandle {
	file: File,
	url: SafeUrl;
}

@Component({
	selector: 'ttc-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],

})
export class FileUploadComponent {

	files: FileHandle[] = [];
	images = ['png', 'jpeg', 'jpg', 'gif'];
	allowed = this.images.map((e) => `.${e}`).join(',');

	constructor(
		public dialogRef: MatDialogRef<FileUploadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private sanitizer: DomSanitizer
	) {
	}

	close(data: any = false) {
		this.dialogRef.close(data)
	}


	fileSelected(event: Event) {
		const files = (event.target as HTMLInputElement).files as FileList;
		if (files.length === 0) {
			return;
		}
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			this.files.push({file, url: this.createIcons(file)});
		}
		(event.target as HTMLInputElement).value = ''; // reset form field
	}

	dropFiles(event: DragEvent) {
		const filesArray = event.dataTransfer as DataTransfer;
		if (filesArray.files.length === 0) {
			return;
		}
		this.sanitizeImages(filesArray)
	}

	sanitizeImages(files: DataTransfer) {
		for (let i = 0; i < files.files.length; i++) {
			const file = files.files[i];
			if (this.images.map(e => `image/${e}`).includes(file.type)) {
				this.files.push({file, url: this.createIcons(file)});
			}
		}
	}

	createIcons(file: Blob | MediaSource) {
		return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
	}

	uploadFile(file: any) {
		const form_data = new FormData();
		form_data.append('file', file);

	}
}

