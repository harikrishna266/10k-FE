import {AfterViewInit, Component} from '@angular/core';
import {ThemeService} from "./core/services/theme.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
		'app.component.scss'
	]
})
export class AppComponent implements AfterViewInit {

	constructor(public theme: ThemeService) {
	}

	ngAfterViewInit() {
		if(!window.matchMedia) {
			this.theme.setDarkTheme();
		}
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.theme.setDarkTheme()
		} else {
			this.theme.setLightTheme()
		}

	}
}
