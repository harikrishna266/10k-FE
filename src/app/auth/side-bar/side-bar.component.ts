import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {StoreService} from "../../core/services/store.service";
import {ConfirmBoxComponent, ConfirmData} from "../../core/shared/confirm-box/confirm-box.component";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../types/user.type";

@Component({
	selector: 'ttc-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

	userDetails: any;

	constructor(
		public userSer: UserService,
		public dialog: MatDialog,
		public storeSer: StoreService,
		private router: Router
	) {
		this.getUserDetails();
	}

	logout() {
		const data: ConfirmData = {
			title: 'Are you sure you want to logout?',
			message: ''
		}
		this.dialog.open(ConfirmBoxComponent, {
			data,
			panelClass: 'ttc-modal-box'
		}).afterClosed().subscribe((e) => {
			if (e) {
				this.clearToken();
				this.router.navigate(['/login']);
			}
		});
	}

	getUserDetails() {
		this.userSer.userDetails()
		.subscribe((user: User ) => {
			this.userDetails  = user;
		})
	}

	clearToken() {
		this.storeSer.token = '';
		this.storeSer.refreshToken = '';
	}
}
