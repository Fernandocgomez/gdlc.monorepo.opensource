import { TestBed } from '@angular/core/testing';

import { UniversalAnalyticsEcommerceEventsService } from './universal-analytics-ecommerce-events.service';

describe('UniversalAnalyticsEcommerceEventsService', () => {
  let service: UniversalAnalyticsEcommerceEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				{
					provide: 'TrackingGoogleTagManagerConfig',
					useValue: { id: 'test_id' },
				},
			],
    });
    service = TestBed.inject(UniversalAnalyticsEcommerceEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#triggerProductImpressions', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerProductClick', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerViewProductDetails', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerAddToCart', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerRemoveFromCart', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerPromotionImpression', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerPromotionClick', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerCheckoutStep', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerCheckoutOption', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerPurchase', () => {
    it('', ()=> {
      // 
    });
  });

  describe('#triggerRefund', () => {
    it('', ()=> {
      // 
    });
  });

});
