import { Injectable } from '@angular/core';

import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';


@Injectable({
  providedIn: 'root'
})
export class UniversalAnalyticsEcommerceEventsService {

  constructor(private trackingGoogleTagManagerService: TrackingGoogleTagManagerService) {}

  public triggerProductImpressions(): void {
    //
  }

  public triggerProductClick(): void {
    // 
  }

  public triggerViewProductDetails(): void {
    //
  }

  public triggerAddToCart(): void {
    //
  }

  public triggerRemoveFromCart(): void {
    //
  }

  public triggerPromotionView(): void {
    //
  }

  public triggerPromotionClick(): void {
    // 
  }

  public triggerCheckoutStep(): void {
    //
  }

  public triggerCheckoutOption(): void {
    //
  }

  public triggerPurchase(): void {
    // 
  }

  public triggerRefund(): void {
    //
  }

}
