import { Injectable } from '@angular/core';

import { GtmService } from './gtm.service';

import { UaEcommerceProduct, CurrencyCode } from '../models';

import { UaEcommerceProductImpressionsEvent } from '../classes';

import { UaEcommerceProducts, Validate } from '../decorators';

@Injectable({
	providedIn: 'root',
})
export class GtmUaEcommerceEventsService {
	constructor(private gtmService: GtmService) {}

	@Validate
	public sendProductImpressionsEvent(
		@UaEcommerceProducts
		products: UaEcommerceProduct[],
		currencyCode: CurrencyCode = 'USD',
	): void {
		const productImpressionEventInstance =
			new UaEcommerceProductImpressionsEvent(
				products,
				currencyCode,
				this.gtmService,
			);

		productImpressionEventInstance.sendEventToTheDataLayer();
	}
}
