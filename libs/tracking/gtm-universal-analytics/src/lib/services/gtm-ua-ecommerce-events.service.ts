import { Injectable } from '@angular/core';

import { GtmService } from './gtm.service';

import { UaEcommerceProduct, CurrencyCode } from '../models';

import { UaEcommerceProductImpressionsEvent } from '../classes';

@Injectable({
	providedIn: 'root',
})
export class GtmUaEcommerceEventsService {
	constructor(private gtmService: GtmService) {}

	public sendProductImpressionsEvent(
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
