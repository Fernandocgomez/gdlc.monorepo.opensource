import { Injectable } from '@angular/core';

import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

@Injectable({
	providedIn: 'root',
})
export class UniversalAnalyticsEcommerceEventsService {
	constructor(
		private trackingGoogleTagManagerService: TrackingGoogleTagManagerService,
	) {}

	public triggerProductImpressionsEvent(
		productImpressionsEvent: UniversalAnalyticsEcommerceProductImpressionsEvent,
	): void {
		const gtmEvent = this.transformProductImpressionEventToGtmEvent(
			productImpressionsEvent,
		);
		this.trackingGoogleTagManagerService.pushToDataLayer(gtmEvent);
	}

	private transformProductImpressionEventToGtmEvent(
		productImpressionEvent: UniversalAnalyticsEcommerceProductImpressionsEvent,
	): GtmEvent {
		return { ...productImpressionEvent, event: 'angularProductImpressions' };
	}

	public triggerProductClickEvent(
		productClickEvent: UniversalAnalyticsEcommerceProductClickEvent,
	): void {
		const gtmEvent =
			this.transformProductClickEventToGtmEvent(productClickEvent);
		this.trackingGoogleTagManagerService.pushToDataLayer(gtmEvent);
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
		this.trackingGoogleTagManagerService.pushToDataLayer(gtmEvent);
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
		this.trackingGoogleTagManagerService.pushToDataLayer(gtmEvent);
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
