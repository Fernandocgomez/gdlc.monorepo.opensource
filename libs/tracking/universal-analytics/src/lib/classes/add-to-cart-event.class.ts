import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { EcommerceEvent } from './ecommerce-event.abstract-class';

export class AddToCartEvent extends EcommerceEvent {
	constructor(
		protected override googleTagManagerService: GoogleTagManagerService,
	) {
		super(googleTagManagerService);
	}

	protected transformToGtmEvent(
		event:
			| UniversalAnalyticsEcommerceProductImpressionsEvent
			| UniversalAnalyticsEcommerceProductClickEvent
			| UniversalAnalyticsEcommerceViewProductDetailsEvent
			| UniversalAnalyticsEcommerceAddToCartEvent,
	): GtmEvent {
		return { ...event, event: 'angularAddToCart' };
	}
}
