import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
	 private subject = new ReplaySubject<ParamMap>();

	constructor(initialParams?: Params) {
		this.setParamMap(initialParams);
	}

	/** The mock paramMap observable */
	readonly paramMap = this.subject.asObservable();

	/** Set the paramMap observable's next value */
	setParamMap(params: Params = {}) {
		this.subject.next(convertToParamMap(params));
	}
}
