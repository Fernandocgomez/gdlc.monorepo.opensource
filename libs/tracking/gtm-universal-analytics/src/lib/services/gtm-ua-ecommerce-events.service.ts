import { Injectable } from '@angular/core';

import { GtmService } from './gtm.service';

import { UaEcommerceProduct, CurrencyCode } from '../models';

import {
	UaEcommerceAddToCartEvent,
	UaEcommerceProductClickEvent,
	UaEcommerceProductImpressionsEvent,
	UaEcommerceProductValidator,
	UaEcommerceViewProductDetailsEvent,
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

	sendViewProductDetailsEvent(
		products: UaEcommerceProduct[],
		searchList?: string,
	): void {
		this.uaEcommerceProductValidator.validate(products);

		const viewProductDetailsInstance = new UaEcommerceViewProductDetailsEvent(
			products,
			this.gtmService,
			searchList,
		);

		viewProductDetailsInstance.sendEventToTheDataLayer();
	}

	sendAddToCartEvent(
		products: UaEcommerceProduct[],
		currencyCode: CurrencyCode = 'USD',
	): void {
		this.uaEcommerceProductValidator.validate(products);

		const addToCartInstance = new UaEcommerceAddToCartEvent(
			products,
			this.gtmService,
			currencyCode,
		);

		addToCartInstance.sendEventToTheDataLayer();
	}
}
