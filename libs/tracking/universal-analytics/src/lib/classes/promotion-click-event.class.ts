import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { EcommerceEvent } from './ecommerce-event.abstract-class';

export class PromotionClickEvent extends EcommerceEvent {
	constructor(
		protected override googleTagManagerService: GoogleTagManagerService,
	) {
		super(googleTagManagerService);
	}

	protected transformToGtmEvent(
		event: UniversalAnalyticsEcommerceEvent,
	): GtmEvent {
		return { ...event, event: 'angularPromoClick' };
	}
}
