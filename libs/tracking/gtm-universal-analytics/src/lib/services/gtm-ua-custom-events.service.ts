import { Injectable } from '@angular/core';

import { GtmEvent, GtmUaCustomEvent } from '../models';

import { GtmService } from './gtm.service';

@Injectable({
	providedIn: 'root',
})
export class GtmUaCustomEventsService {
	constructor(private gtmService: GtmService) {}

	public sendCustomEvent(customEvent: GtmUaCustomEvent): void {
		const gtmEvent: GtmEvent = this.transformToGtmEvent(customEvent);
		this.gtmService.pushToDataLayer(gtmEvent);
	}

	private transformToGtmEvent(customEvent: GtmUaCustomEvent): GtmEvent {
		return { ...customEvent, event: 'angularCustomEvent' };
	}
}
