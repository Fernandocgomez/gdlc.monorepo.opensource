import { Inject, Injectable, Optional } from '@angular/core';

import { GtmEvent, GtmConfig } from '../models';

declare global {
	interface Window {
		dataLayer: Array<GtmEvent>;
	}
}

@Injectable({
	providedIn: 'root',
})
export class GtmService {
	constructor(
		@Optional()
		@Inject('GtmConfig')
		private config: GtmConfig = { id: null },
	) {
		console.log(config);
	}
}
