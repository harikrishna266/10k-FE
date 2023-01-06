import {Component} from '@angular/core';
import {ThemeService} from "../../services/theme.service";

@Component({
	selector: 'ttc-check-box',
	templateUrl: './check-box.component.html',
	styleUrls: ['./check-box.component.scss'],

})
export class CheckBoxComponent {

	constructor(public themeSer: ThemeService) {}
	changeTheme(event: any) {
		if(event.target.checked === true) {
			this.themeSer.setLightTheme()
		} else {
			this.themeSer.setDarkTheme()
		}
	}
}
