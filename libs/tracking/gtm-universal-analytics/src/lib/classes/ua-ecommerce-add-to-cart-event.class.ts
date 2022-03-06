import { CurrencyCode, UaEcommerceProduct } from '../models';

import { GtmService } from '../services/gtm.service';

import { UaEcommerceEventAbstraction } from './ua-ecommerce-event-abstraction.class';

export class UaEcommerceAddToCartEvent extends UaEcommerceEventAbstraction {
	constructor(
		private products: UaEcommerceProduct[],
		protected override gtmService: GtmService,
		private currencyCode: CurrencyCode,
	) {
		super(gtmService);
		this.initEcommerceEvent();
	}

	protected initEcommerceEvent(): void {
		this.ecommerceEvent = {
			ecommerce: {
				currencyCode: this.currencyCode,
				add: {
					products: this.products,
				},
			},
			category: this.eventCategory,
			action: 'add to cart',
			label: `${this.products[0].name} - added to cart`,
			nonInteraction: true,
		};
	}
}
