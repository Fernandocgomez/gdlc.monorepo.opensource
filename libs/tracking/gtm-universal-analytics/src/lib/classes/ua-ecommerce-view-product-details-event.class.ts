import { UaEcommerceProduct } from '../models';

import { GtmService } from '../services/gtm.service';

import { UaEcommerceEventAbstraction } from './ua-ecommerce-event-abstraction.class';

export class UaEcommerceViewProductDetailsEvent extends UaEcommerceEventAbstraction {
	constructor(
		private products: UaEcommerceProduct[],
		protected override gtmService: GtmService,
		private searchList?: string,
	) {
		super(gtmService);
		this.initEcommerceEvent();
	}

	protected initEcommerceEvent(): void {
		this.ecommerceEvent = {
			ecommerce: {
				detail: {
					actionField: {
						list: this.searchList,
					},
					products: this.products,
				},
			},
			category: this.eventCategory,
			action: 'view',
			label: 'view product details',
			nonInteraction: false,
		};

		if (!this.searchList) {
			delete this.ecommerceEvent.ecommerce.detail.actionField;
		}
	}
}
