import { Injectable } from '@angular/core';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceCheckoutStepEvent,
	UniversalAnalyticsEcommerceItem,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommercePromoClickEvent,
	UniversalAnalyticsEcommercePromotion,
	UniversalAnalyticsEcommercePromoViewEvent,
	UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import {
	AddToCartEvent,
	ProductClickEvent,
	ProductImpressionsEvent,
	RemoveFromCartEvent,
	ViewProductDetailsEvent,
	PromotionViewEvent,
	PromotionClickEvent,
} from './classes';

@Injectable({
	providedIn: 'root',
})
export class UniversalAnalyticsEcommerceEventsService {
	private productImpressionsEvent: ProductImpressionsEvent;
	private productClickEvent: ProductClickEvent;
	private viewProductDetailsEvent: ViewProductDetailsEvent;
	private addToCartEvent: AddToCartEvent;
	private removeFromCartEvent: RemoveFromCartEvent;
	private promotionViewEvent: PromotionViewEvent;
	private promotionClickEvent: PromotionClickEvent;

	constructor(private googleTagManagerService: GoogleTagManagerService) {
		this.productImpressionsEvent = new ProductImpressionsEvent(
			googleTagManagerService,
		);
		this.productClickEvent = new ProductClickEvent(googleTagManagerService);
		this.viewProductDetailsEvent = new ViewProductDetailsEvent(
			googleTagManagerService,
		);
		this.addToCartEvent = new AddToCartEvent(googleTagManagerService);
		this.removeFromCartEvent = new RemoveFromCartEvent(googleTagManagerService);
		this.promotionViewEvent = new PromotionViewEvent(googleTagManagerService);
		this.promotionClickEvent = new PromotionClickEvent(googleTagManagerService);
	}

	public triggerProductImpressionsEvent(
		products: UniversalAnalyticsEcommerceItem[],
		currencyCode: string = 'USD',
	): void {
		const productImpressionsEvent: UniversalAnalyticsEcommerceProductImpressionsEvent =
			{
				ecommerce: {
					currencyCode,
					impressions: products,
				},
			};
		this.productImpressionsEvent.trigger(productImpressionsEvent);
	}

	public triggerProductClickEvent(
		products: UniversalAnalyticsEcommerceItem[],
		searchList: string = '',
	): void {
		const productClickEvent: UniversalAnalyticsEcommerceProductClickEvent = {
			ecommerce: {
				click: {
					actionField: {
						list: searchList ? searchList : '',
					},
					products,
				},
			},
		};
		this.productClickEvent.trigger(productClickEvent);
	}

	public triggerViewProductDetailsEvent(
		products: UniversalAnalyticsEcommerceItem[],
		searchList: string = '',
	): void {
		const viewProductDetailsEvent: UniversalAnalyticsEcommerceViewProductDetailsEvent =
			{
				ecommerce: {
					detail: {
						actionField: {
							list: searchList ? searchList : '',
						},
						products,
					},
				},
			};
		this.viewProductDetailsEvent.trigger(viewProductDetailsEvent);
	}

	public triggerAddToCartEvent(
		products: UniversalAnalyticsEcommerceItem[],
		currencyCode: string = 'USD',
	): void {
		const addToCartEvent: UniversalAnalyticsEcommerceAddToCartEvent = {
			ecommerce: {
				currencyCode,
				add: {
					products,
				},
			},
		};
		this.addToCartEvent.trigger(addToCartEvent);
	}

	public triggerRemoveFromCartEvent(
		products: UniversalAnalyticsEcommerceItem[],
	): void {
		const removeFromCartEvent: UniversalAnalyticsEcommerceRemoveProductFromCartEvent =
			{
				ecommerce: {
					remove: {
						products,
					},
				},
			};
		this.removeFromCartEvent.trigger(removeFromCartEvent);
	}

	public triggerPromotionViewEvent(
		promotions: UniversalAnalyticsEcommercePromotion[],
	): void {
		const promoViewEvent: UniversalAnalyticsEcommercePromoViewEvent = {
			ecommerce: {
				promoView: {
					promotions,
				},
			},
		};
		this.promotionViewEvent.trigger(promoViewEvent);
	}

	public triggerPromotionClickEvent(
		promotions: UniversalAnalyticsEcommercePromotion[],
	): void {
		const promotionClickEvent: UniversalAnalyticsEcommercePromoClickEvent = {
			ecommerce: {
				promoClick: {
					promotions,
				},
			},
		};
		this.promotionClickEvent.trigger(promotionClickEvent);
	}

	public triggerCheckoutStepEvent(
		step: number,
		additionalDataAboutPage: string,
		products: UniversalAnalyticsEcommerceItem[],
	): void {
		if (Math.sign(step) === -1) {
			throw new Error('step should be a positive number');
		}
		const checkoutStepEvent: UniversalAnalyticsEcommerceCheckoutStepEvent = {
			ecommerce: {
				checkout: {
					actionField: {
						step,
						option: additionalDataAboutPage,
					},
					products,
				},
			},
		};
	}

	public triggerCheckoutOptionEvent(): void {
		//
	}

	public triggerPurchaseEvent(): void {
		//
	}

	public triggerRefundEvent(): void {
		//
	}
}
