import {Component, Input, OnInit} from '@angular/core';
import {FileHandle} from "../file-upload/file-upload.component";
import {HttpEvent} from "@angular/common/http";
import {map} from "rxjs";
import {ImageService} from "../../services/image.service";

@Component({
	selector: 'ttc-file-upload-progress-bar',
	templateUrl: './file-upload-progress-bar.component.html',
	styleUrls: ['./file-upload-progress-bar.component.scss']
})
export class FileUploadProgressBarComponent implements OnInit {

	private _file!: FileHandle;
	get file() {
		return this._file;
	}

	@Input() set file(value) {
		this._file = value;
		this.uploadFile();
	}

	progress = 0;

	constructor(public imageSer: ImageService) {}

	ngOnInit(): void { }

	uploadFile() {
		const formData: FormData = new FormData();
		formData.append('image', this.file.file, this.file.file.name);

		this.imageSer.uploadImage(formData)
			.pipe(
				map((event: HttpEvent<any>) => this.getEventMessage(event)),
			)
			.subscribe(res => {});
	}

	getEventMessage({loaded, total}: any): void {
		if (loaded && total) {
			this.progress = Math.round(loaded * 100 / total);
		}
	}
}
