import {Injectable} from '@angular/core';
import {SessionStoreService} from "./session-store.service";

declare const localStorage: Storage;

@Injectable({
	providedIn: 'root'
})

export class StoreService extends SessionStoreService {

	private _user: any
	get user(): string {
		return this.getValueFromLocalStore('user')
	}

	set user(value: string) {
		this.setValueToLocalStore('user', value)
	}

	constructor() {
		super()
	}

}
