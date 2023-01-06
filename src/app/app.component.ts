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
		this.theme.setDarkTheme()
	}
}
