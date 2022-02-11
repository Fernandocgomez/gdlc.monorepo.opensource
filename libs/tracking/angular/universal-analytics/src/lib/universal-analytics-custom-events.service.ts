import { Injectable } from '@angular/core';

import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

import { GtmUniversalAnalyticsCustomEvent } from '@multi-step-funnels/tracking/tracking-models';

@Injectable({
	providedIn: 'root',
})
export class UniversalAnalyticsCustomEventsService {
	constructor(
		private googleTagManagerService: TrackingGoogleTagManagerService,
	) {}

	public triggerCustomEvent(gtmObj: GtmUniversalAnalyticsCustomEvent): void {
		this.googleTagManagerService.pushToDataLayer(gtmObj);
	}
}
