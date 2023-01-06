import {Injectable} from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateChild,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {StoreService} from "../services/store.service";

@Injectable({
	providedIn: 'root'
})
export class IsUserLoggedInGuard implements CanActivateChild, CanActivate {

	constructor(public store: StoreService, private route: Router) {
	}

	canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.store.token ) {
			return this.route.navigate(['./login']);
		}
		return true;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.store.token && ['/login', '/register'].includes(state.url)) {
			return this.route.navigate(['./dashboard']);
		}
		return true;
	}

}
