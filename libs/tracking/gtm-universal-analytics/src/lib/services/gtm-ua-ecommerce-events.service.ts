import { Injectable } from '@angular/core';

import { GtmService } from './gtm.service';

import { UaEcommerceProduct, CurrencyCode } from '../models';

import {
	UaEcommerceProductClickEvent,
	UaEcommerceProductImpressionsEvent,
	UaEcommerceProductValidator,
} from '../classes';

@Injectable({
	providedIn: 'root',
})
export class GtmUaEcommerceEventsService {
	private readonly uaEcommerceProductValidator: UaEcommerceProductValidator =
		new UaEcommerceProductValidator();

	constructor(private readonly gtmService: GtmService) {}

	sendProductImpressionsEvent(
		products: UaEcommerceProduct[],
		currencyCode: CurrencyCode = 'USD',
	): void {
		this.uaEcommerceProductValidator.validate(products);

		const productImpressionEventInstance =
			new UaEcommerceProductImpressionsEvent(
				products,
				currencyCode,
				this.gtmService,
			);

		productImpressionEventInstance.sendEventToTheDataLayer();
	}

	sendProductClickEvent(
		products: UaEcommerceProduct[],
		searchList?: string,
	): void {
		this.uaEcommerceProductValidator.validate(products);

		const productClickEventInstance = new UaEcommerceProductClickEvent(
			products,
			this.gtmService,
			searchList,
		);

		productClickEventInstance.sendEventToTheDataLayer();
	}
}
