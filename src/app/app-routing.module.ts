import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {IsUserLoggedInGuard} from "./core/gaurds/is-user-logged-in.guard";


export const routes: Routes = [
	{
		path: 'login',
		canActivate: [IsUserLoggedInGuard],
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
	},
	{
		path: 'register',
		canActivate: [IsUserLoggedInGuard],
		loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
	},
	{
		path: '',
		canActivateChild: [IsUserLoggedInGuard],
		children: [
			{
				path: '',
				component: AuthComponent,
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			}
		]
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}


