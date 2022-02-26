import { CurrencyCode, UaEcommerceProduct } from '../models';

import { GtmService } from '../services/gtm.service';

import { UaEcommerceEventAbstraction } from './ua-ecommerce-event-abstraction.class';

export class UaEcommerceProductImpressionsEvent extends UaEcommerceEventAbstraction {
	constructor(
		private products: UaEcommerceProduct[],
		private currencyCode: CurrencyCode = 'USD',
		protected override gtmService: GtmService,
	) {
		super(gtmService);
		this.initEcommerceEvent();
	}

	protected initEcommerceEvent(): void {
		this.ecommerceEvent = {
			ecommerce: {
				currencyCode: this.currencyCode,
				impressions: this.products,
			},
			category: this.eventCategory,
			action: 'impressions',
			label: 'product impressions',
			nonInteraction: false,
		};
	}
}
