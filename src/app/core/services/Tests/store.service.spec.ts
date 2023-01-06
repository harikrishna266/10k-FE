import {StoreService} from "../store.service";
import {SessionStoreService} from "../session-store.service";


describe('StoreService', () => {
	let storeService: StoreService;
 	let mockLocalStorage: any;
	let store = {};
	beforeEach(() => {
		storeService = new StoreService();
	})

	beforeEach(() => {
		store = {};
		mockLocalStorage = {
			getItem: (key: string): string => {
				// @ts-ignore
				return key in store ? store[key] : null;
			},
			setItem: (key: string, value: string) => {
				// @ts-ignore
				store[key] = `${value}`;
			},
			removeItem: (key: string) => {
				// @ts-ignore
				delete store[key];
			},
			clear: () => {
				store = {};
			}
		};
	})

	describe('it should be created', () => {
		it('should be created', () => {
			expect(storeService).toBeTruthy();
		});
	})

	describe('Should store the value of user', () => {
		it('setting a property should call the localStore set  method internally', () => {
			//@ts-ignore
			const setter = jest.spyOn(window.localStorage.__proto__, 'setItem');
			storeService.user = 'joe';
			expect(setter).toHaveBeenCalledWith('user', 'joe');
		})
		it('get a property should call the localStore get  method internally', () => {
			//@ts-ignore
			const setter = jest.spyOn(window.localStorage.__proto__, 'getItem');
			const user = storeService.user ;
			expect(setter).toHaveBeenCalledWith('user');
		})
	});

	describe('Should store the value of user', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it('refresh token and access token should be stored in session storage', () => {
			//@ts-ignore
			const session = new SessionStoreService();
			//@ts-ignore
			const setter = jest.spyOn(window.sessionStorage.__proto__, 'setItem');

			session.token = 'token';
			session.refreshToken = 'token';
			expect(setter).toHaveBeenCalledTimes(2);

		});

		it('refresh token and access token should be stored in session storage', () => {
			//@ts-ignore
 			const setter = jest.spyOn(window.sessionStorage.__proto__, 'getItem');
			const session = new SessionStoreService();
			const token = session.token;
 			expect(setter).toHaveBeenCalledTimes(1);

		});
	})
})
