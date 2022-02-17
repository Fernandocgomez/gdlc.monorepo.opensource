import { Injectable } from '@angular/core';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { GtmUniversalAnalyticsCustomEvent } from '@multi-step-funnels/tracking/tracking-models';

@Injectable({
	providedIn: 'root',
})
export class UniversalAnalyticsCustomEventsService {
	constructor(private googleTagManagerService: GoogleTagManagerService) {}

	public triggerCustomEvent(gtmObj: GtmUniversalAnalyticsCustomEvent): void {
		this.googleTagManagerService.pushToDataLayer(gtmObj);
	}
}
