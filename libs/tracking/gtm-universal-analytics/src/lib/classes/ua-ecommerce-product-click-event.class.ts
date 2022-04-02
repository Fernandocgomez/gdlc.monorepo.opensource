import { UaEcommerceProduct } from '../models';

import { GtmService } from '../services/gtm.service';

import { UaEcommerceEventAbstraction } from './ua-ecommerce-event-abstraction.class';

export class UaEcommerceProductClickEvent extends UaEcommerceEventAbstraction {
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
				click: {
					actionField: {
						list: this.searchList,
					},
					products: this.products,
				},
			},
			category: this.eventCategory,
			action: 'click',
			label: 'product click',
			nonInteraction: true,
		};

		if (!this.searchList) {
			delete this.ecommerceEvent.ecommerce.click.actionField;
		}
	}
}
