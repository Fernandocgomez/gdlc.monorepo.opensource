import { Injectable } from '@angular/core';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { ProductImpressionsEvent } from './classes/product-impressions-event.class';

@Injectable({
	providedIn: 'root',
})
export class UniversalAnalyticsEcommerceEventsService {
	private productImpressionsEvent: ProductImpressionsEvent;

	constructor(private GoogleTagManagerService: GoogleTagManagerService) {
		this.productImpressionsEvent = new ProductImpressionsEvent(
			GoogleTagManagerService,
		);
	}

	public triggerProductImpressionsEvent(
		productImpressionsEvent: UniversalAnalyticsEcommerceProductImpressionsEvent,
	): void {
		this.productImpressionsEvent.trigger(productImpressionsEvent);
	}

	public triggerProductClickEvent(
		productClickEvent: UniversalAnalyticsEcommerceProductClickEvent,
	): void {
		const gtmEvent =
			this.transformProductClickEventToGtmEvent(productClickEvent);
		this.GoogleTagManagerService.pushToDataLayer(gtmEvent);
	}

	private transformProductClickEventToGtmEvent(
		productClickEvent: UniversalAnalyticsEcommerceProductClickEvent,
	): GtmEvent {
		return { ...productClickEvent, event: 'angularProductClick' };
	}

	public triggerViewProductDetailsEvent(
		viewProductDetailsEvent: UniversalAnalyticsEcommerceViewProductDetailsEvent,
	): void {
		const gtmEvent = this.transformViewProductDetailsToGtmEvent(
			viewProductDetailsEvent,
		);
		this.GoogleTagManagerService.pushToDataLayer(gtmEvent);
	}

	private transformViewProductDetailsToGtmEvent(
		viewProductDetailsEvent: UniversalAnalyticsEcommerceViewProductDetailsEvent,
	): GtmEvent {
		return { ...viewProductDetailsEvent, event: 'angularViewProductDetails' };
	}

	public triggerAddToCartEvent(
		addToCartEvent: UniversalAnalyticsEcommerceAddToCartEvent,
	): void {
		const gtmEvent = this.transformAddToCartEventToGtmEvent(addToCartEvent);
		this.GoogleTagManagerService.pushToDataLayer(gtmEvent);
	}

	private transformAddToCartEventToGtmEvent(
		addToCartEvent: UniversalAnalyticsEcommerceAddToCartEvent,
	): GtmEvent {
		return { ...addToCartEvent, event: 'angularAddToCart' };
	}

	public triggerRemoveFromCartEvent(): void {
		//
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
