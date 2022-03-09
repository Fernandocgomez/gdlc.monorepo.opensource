import { UaEcommercePromotion } from '../models';

import { GtmService } from '../services/gtm.service';

import { UaEcommerceEventAbstraction } from './ua-ecommerce-event-abstraction.class';

export class UaEcommercePromotionImpressionsEvent extends UaEcommerceEventAbstraction {
	constructor(
		private promotions: UaEcommercePromotion[],
		protected override gtmService: GtmService,
	) {
		super(gtmService);
		this.initEcommerceEvent();
	}

	protected initEcommerceEvent(): void {
		this.ecommerceEvent = {
			ecommerce: {
				promoView: {
					promotions: this.promotions,
				},
			},
			category: this.eventCategory,
			action: 'impression',
			label: `promotion impression`,
			nonInteraction: false,
		};
	}
}
