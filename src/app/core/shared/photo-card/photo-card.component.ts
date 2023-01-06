import {Component, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
	selector: 'ttc-photo-card',
	templateUrl: './photo-card.component.html',
	styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent {

	@Input() image: any;
	random = Math.floor(Math.random() * 100);
	classes = ['small', 'medium', 'large'];
	cardClass = this.classes[0];

	constructor(private _sanitizer: DomSanitizer) {
		this.cardClass = this.getRandomClass()
	}

	getRandomClass(max = 3): string {
		return this.classes[Math.floor(Math.random() * max)];
	}
}
