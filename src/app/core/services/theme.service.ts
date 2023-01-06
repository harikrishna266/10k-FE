import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	theme = 'dark';

	setDarkTheme() {
		this.theme = 'light';
		const root = document.querySelector(':root') as HTMLElement;
		root.style.setProperty('--background-color' , '#181818');
		root.style.setProperty('--box-color' , '#131315');
		root.style.setProperty('--background-700' , '#f0f0f3');
		root.style.setProperty('--background-600' , '#a7a7a9');
		root.style.setProperty('--text-color' , '#bcbcbc');
		root.style.setProperty('--input-color' , '#eeeeee');
		root.style.setProperty('--input-bg' , '#1d1d1d4d');
		root.style.setProperty('--input-border' , '#41414159');
		root.style.setProperty('--error' , '#ea6565');
		root.style.setProperty('--buton-bg' , '#027736');
		root.style.setProperty('--buton-color' , '#fff');
		root.style.setProperty('--border-color' , '#181818');
		root.style.setProperty('--shadow' , '0 0 19px 0 #221b1b');
	}

	setLightTheme() {
		this.theme = 'dark';
		const root = document.querySelector(':root') as HTMLElement;
		root.style.setProperty('--background-color' , '#efefef');
		root.style.setProperty('--box-color' , '#ffffff');
		root.style.setProperty('--background-700' , '#f0f0f3');
		root.style.setProperty('--background-600' , '#a7a7a9');
		root.style.setProperty('--text-color' , '#333');
		root.style.setProperty('--input-color' , '#eeeeee');
		root.style.setProperty('--input-bg' , '#eeeeee4d');
		root.style.setProperty('--input-border' , '#98979759');
		root.style.setProperty('--error' , '#ea6565');
		root.style.setProperty('--buton-bg' , '#708090');
		root.style.setProperty('--buton-color' , '#fff');
		root.style.setProperty('--border-color' , '#e6e6e6');
		root.style.setProperty('--shadow' , '0 0 27px 0 #c1bcbc');
	}
}
