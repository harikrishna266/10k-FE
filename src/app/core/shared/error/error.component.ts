import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
	selector: 'ttc-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
	@Input() formEle!: FormControl | FormGroup;

	constructor() {
		// this.formEle.va
	}

}
