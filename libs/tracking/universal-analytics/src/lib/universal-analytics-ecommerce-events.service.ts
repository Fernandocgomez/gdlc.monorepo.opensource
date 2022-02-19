import { Injectable } from '@angular/core';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceItem,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import {
	AddToCartEvent,
	ProductClickEvent,
	ProductImpressionsEvent,
	RemoveFromCartEvent,
	ViewProductDetailsEvent,
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
		removeFromCartEvent: UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	): void {
		this.removeFromCartEvent.trigger(removeFromCartEvent);
	}

	public triggerPromotionViewEvent(): void {
		//
	}

	public triggerPromotionClickEvent(): void {
		//
	}

	public triggerCheckoutStepEvent(): void {
		//
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
