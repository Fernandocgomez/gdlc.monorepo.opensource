import { UaEcommerceProduct } from '../models';

import { GtmService } from '../services/gtm.service';

import { UaEcommerceEventAbstraction } from './ua-ecommerce-event-abstraction.class';

export class UaEcommerceRemoveFromCartEvent extends UaEcommerceEventAbstraction {
	constructor(
		private products: UaEcommerceProduct[],
		protected override gtmService: GtmService,
	) {
		super(gtmService);
		this.initEcommerceEvent();
	}

	protected initEcommerceEvent(): void {
		this.ecommerceEvent = {
			ecommerce: {
				remove: {
					products: this.products,
				},
			},
			category: this.eventCategory,
			action: 'remove product from cart',
			label: `${this.products[0].name} - removed from cart`,
			nonInteraction: true,
		};
	}
}
