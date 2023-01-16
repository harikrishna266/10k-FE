import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
	selector: 'ttc-photo-card',
	templateUrl: './photo-card.component.html',
	styleUrls: ['./photo-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCardComponent {
	private _image: any;
	get image(): any {
		return this._image;
	}

	@Input() set image(value: any) {
		console.log(value.images._id);
		this._image = value;
	}





}
