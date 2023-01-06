declare const sessionStorage: Storage;

export class SessionStoreService {

	private _token!: string;
	set token(token: string | boolean) {
		if (token) {
			sessionStorage.setItem('token', token as string);
		} else {
			sessionStorage.clear();
		}
	}

	get token(): string {
		return sessionStorage.getItem('token') as string;
	}


	private _refreshToken!: string;
	set refreshToken(refreshToken: string) {
		if (refreshToken) {
			sessionStorage.setItem('refreshToken', refreshToken);
		} else {
			sessionStorage.clear();
		}
	}

	get refreshToken(): string {
		return sessionStorage.getItem('refreshToken') as string;
	}


	setValueToLocalStore(key: string, value: string) {
		if (value) {
			localStorage.setItem(key, value);
		} else {
			localStorage.removeItem(key);
		}
	}


	getValueFromLocalStore(key: string) {
		try {
			const value = localStorage.getItem(key) as string;
			return JSON.parse(value);
		} catch (e) {
			return localStorage.getItem(key);
		}
	}
}
