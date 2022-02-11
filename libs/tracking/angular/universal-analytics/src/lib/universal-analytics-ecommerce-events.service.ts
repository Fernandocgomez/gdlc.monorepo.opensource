import { Injectable } from '@angular/core';

import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

import { 
  GtmEvent,
  UniversalAnalyticsEcommerceProductImpressionsEvent 
} from '@multi-step-funnels/tracking/tracking-models';

@Injectable({
  providedIn: 'root'
})
export class UniversalAnalyticsEcommerceEventsService {

  constructor(private trackingGoogleTagManagerService: TrackingGoogleTagManagerService) {}

  private transformProductImpressionEventToGtmEvent(productImpressionEvent: UniversalAnalyticsEcommerceProductImpressionsEvent): GtmEvent {
    return {...productImpressionEvent, event: 'angularProductImpressions'}
  }

  public triggerProductImpressionsEvent(productImpressionsEvent: UniversalAnalyticsEcommerceProductImpressionsEvent): void {
    const gtmEvent = this.transformProductImpressionEventToGtmEvent(productImpressionsEvent);
    this.trackingGoogleTagManagerService.pushToDataLayer(gtmEvent);
  }

  public triggerProductClickEvent(): void {
    // 
  }

  public triggerViewProductDetailsEvent(): void {
    //
  }

  public triggerAddToCartEvent(): void {
    //
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