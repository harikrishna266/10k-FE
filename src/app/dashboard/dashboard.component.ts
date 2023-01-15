import {ChangeDetectionStrategy, Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ImageApi, UserService} from "../core/services/user.service";
import {debounceTime, map, Observable, switchMap, tap} from "rxjs";
import {FileUploadComponent} from "../shared/file-upload/file-upload.component";
import {MatDialog} from "@angular/material/dialog";
import {Image} from "../types/image.type";

export type Queryparams = { skip: number, limit: number, search: string, id: number }

@Component({
	selector: 'ttc-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class DashboardComponent implements OnInit {

	queryParams = {skip: 0, limit: 30, search: '', id: new Date().getTime()}
	image$!: Observable<Image[]>;
	totalImages = 0;
	paginationArray!: number[];
	loader!: boolean;

	constructor(
		private route: ActivatedRoute,
		public dial: MatDialog,
		private router: Router,
		public userSer: UserService) {
	}

	ngOnInit() {
		this.watchUrlParams();
	}

	resetParams() {
		return {skip: 0, limit: 30, search: '', id: new Date().getTime()}
	}

	watchUrlParams() {
		this.image$ = this.route.queryParams
			.pipe(
				tap((e: Params) => {
					this.updateParams(e as Queryparams)
				}),
				tap(() => this.loader = true),
				debounceTime(300),
				switchMap(() => this.searchImage())
			)
	}

	searchImage() {
		return this.userSer
			.getUserImages(this.queryParams)
			.pipe(
				tap((e: ImageApi) => this.updatePagination(e.count)),
				tap(() => this.loader = false),
				map((e: ImageApi) => e.images),
				map((e: Image[]) => this.getRandomHeight(e))
			)
	}

	updateParams(params: Queryparams) {
		const {skip, limit, search} = params;
		this.queryParams = {
			skip: skip || this.queryParams.skip,
			limit: limit > 0 ? limit : this.queryParams.limit,
			search: search || this.queryParams.search,
			id: new Date().getTime()
		}
	}

	updateSearch(event: KeyboardEvent) {
		const search = (event.target as HTMLInputElement).value;
		this.queryParams = {...this.resetParams(), search};
		this.updateParams(this.queryParams);
		this.updateUrlParams();
	}

	updateUrlParams() {
		this.router.navigate(['/dashboard'], {queryParams: this.queryParams});
	}

	openUpload() {
		this.dial.open(FileUploadComponent, {
			width: '600px',
			height: 'auto',
			panelClass: 'ttc-modal-box'
		}).afterClosed().subscribe(res => {
			this.updateParams(this.resetParams());
			this.updateUrlParams();
		})
	}



	getRandomHeight(images: Image[]) {
		const classes = ['small' , 'medium' ,'large'];
		return images.map(image => {
			const random = 		Math.floor(Math.random()*3);
			return {...image, classname: classes[random]}
		})
	}


	updatePagination(count: any) {
		this.totalImages = count[0] ? count[0].count : 0
		this.paginationArray = this.totalImages > 0 ? Array(Math.ceil(this.totalImages / this.queryParams.limit)).fill(1).map((e, i) => i + 1) : [];
	}

	goToPage(page: number) {
		this.queryParams.skip = (page - 1) * this.queryParams.limit;
		this.updateParams(this.queryParams);
		this.updateUrlParams();
	}


}
