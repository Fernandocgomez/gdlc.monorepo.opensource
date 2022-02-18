import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

export abstract class EcommerceEvent {
	constructor(protected googleTagManagerService: GoogleTagManagerService) {}

	trigger(
		event:
			| UniversalAnalyticsEcommerceProductImpressionsEvent
			| UniversalAnalyticsEcommerceProductClickEvent
			| UniversalAnalyticsEcommerceViewProductDetailsEvent
			| UniversalAnalyticsEcommerceAddToCartEvent,
	): void {
		const gtmEvent = this.transformToGtmEvent(event);
		this.googleTagManagerService.pushToDataLayer(gtmEvent);
	}

	protected abstract transformToGtmEvent(
		event:
			| UniversalAnalyticsEcommerceProductImpressionsEvent
			| UniversalAnalyticsEcommerceProductClickEvent
			| UniversalAnalyticsEcommerceViewProductDetailsEvent
			| UniversalAnalyticsEcommerceAddToCartEvent,
	): GtmEvent;
}
