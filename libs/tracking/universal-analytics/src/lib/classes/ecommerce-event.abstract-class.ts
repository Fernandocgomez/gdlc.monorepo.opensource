import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceEvent,
} from '@multi-step-funnels/tracking/tracking-models';

export abstract class EcommerceEvent {
	constructor(protected googleTagManagerService: GoogleTagManagerService) {}

	trigger(event: UniversalAnalyticsEcommerceEvent): void {
		const gtmEvent = this.transformToGtmEvent(event);
		this.googleTagManagerService.clearEcommerceObject();
		this.googleTagManagerService.pushToDataLayer(gtmEvent);
	}

	protected abstract transformToGtmEvent(
		event: UniversalAnalyticsEcommerceEvent,
	): GtmEvent;
}
