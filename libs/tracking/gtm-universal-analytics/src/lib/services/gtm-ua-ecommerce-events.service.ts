import { Injectable } from '@angular/core';

import { GtmService } from './gtm.service';

import {
	UaEcommerceProduct,
	CurrencyCode,
	UaEcommercePromotion,
} from '../models';

import {
	UaEcommerceAddToCartEvent,
	UaEcommerceProductClickEvent,
	UaEcommerceProductImpressionsEvent,
	UaEcommerceProductValidator,
	UaEcommercePromotionImpressionsEvent,
	UaEcommercePromotionValidator,
	UaEcommerceRemoveFromCartEvent,
	UaEcommerceViewProductDetailsEvent,
} from '../classes';

@Injectable({
	providedIn: 'root',
})
export class GtmUaEcommerceEventsService {
	private readonly uaEcommerceProductValidator: UaEcommerceProductValidator =
		new UaEcommerceProductValidator();

	private readonly uaEcommercePromotionValidator: UaEcommercePromotionValidator =
		new UaEcommercePromotionValidator();

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
		this.uaEcommerceProductValidator.validateAgainstEmptyProductArray(products);
		this.uaEcommerceProductValidator.validate(products);

		const addToCartInstance = new UaEcommerceAddToCartEvent(
			products,
			this.gtmService,
			currencyCode,
		);

		addToCartInstance.sendEventToTheDataLayer();
	}

	sendRemoveProductFromCartEvent(products: UaEcommerceProduct[]): void {
		this.uaEcommerceProductValidator.validateAgainstEmptyProductArray(products);
		this.uaEcommerceProductValidator.validate(products);

		const removeProductFromCartInstance = new UaEcommerceRemoveFromCartEvent(
			products,
			this.gtmService,
		);

		removeProductFromCartInstance.sendEventToTheDataLayer();
	}

	sendPromotionImpressionsEvent(promotions: UaEcommercePromotion[]): void {
		this.uaEcommercePromotionValidator.validate(promotions);

		const promotionImpressionsInstance =
			new UaEcommercePromotionImpressionsEvent(promotions, this.gtmService);

		promotionImpressionsInstance.sendEventToTheDataLayer();
	}
}
