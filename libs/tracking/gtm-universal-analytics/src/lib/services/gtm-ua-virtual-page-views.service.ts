import { Injectable } from '@angular/core';

import { GtmService } from './gtm.service';

@Injectable({
	providedIn: 'root',
})
export class GtmUaVirtualPageViewsService {
	constructor(private gtmService: GtmService) {
		//
	}
}
