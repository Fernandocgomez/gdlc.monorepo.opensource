import { Injectable } from '@angular/core';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	UniversalAnalyticsEcommerceAddToCartEvent,
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
		productImpressionsEvent: UniversalAnalyticsEcommerceProductImpressionsEvent,
	): void {
		this.productImpressionsEvent.trigger(productImpressionsEvent);
	}

	public triggerProductClickEvent(
		productClickEvent: UniversalAnalyticsEcommerceProductClickEvent,
	): void {
		this.productClickEvent.trigger(productClickEvent);
	}

	public triggerViewProductDetailsEvent(
		viewProductDetailsEvent: UniversalAnalyticsEcommerceViewProductDetailsEvent,
	): void {
		this.viewProductDetailsEvent.trigger(viewProductDetailsEvent);
	}

	public triggerAddToCartEvent(
		addToCartEvent: UniversalAnalyticsEcommerceAddToCartEvent,
	): void {
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
