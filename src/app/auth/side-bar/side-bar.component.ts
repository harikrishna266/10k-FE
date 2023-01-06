import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {StoreService} from "../../core/services/store.service";
import {ConfirmData} from "../../core/shared/confirm-box/confirm-box.component";

@Component({
	selector: 'ttc-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

	constructor(
		public userSer: UserService,
		// public dialog: MatDialog,
		public storeSer: StoreService,
		// private router: Router
	) {
	}

	logout() {
		// const data: ConfirmData = {
		// 	title: 'Are you sure you want to logout?',
		// 	message: ''
		// }
		// this.dialog.open(ConfirmBoxComponent, {
		// 	data,
		// 	panelClass: 'ttc-modal-box'
		// }).afterClosed().subscribe((e) => {
		// 	if (e) {
		// 		this.clearToken();
		// 		this.router.navigate(['/login']);
		// 	}
		// });
	}

	clearToken() {
		this.storeSer.token = '';
		this.storeSer.refreshToken = '';
	}
}
