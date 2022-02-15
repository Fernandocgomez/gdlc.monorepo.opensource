import { TestBed } from '@angular/core/testing';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { UniversalAnalyticsEcommerceEventsService } from './universal-analytics-ecommerce-events.service';
import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

import {
	productImpressionEvent,
	productClickEvent,
	ViewProductDetailsEvent,
	addToCartEvent,
} from './utilities/universal-analytics-ecommerce-event-objects';

import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceProductClickEvent,
	isOfTypeUniversalAnalyticsEcommerceProductImpressionsEvent,
	isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent,
	isOfTypeUniversalAnalyticsEcommerceAddToCartEvent,
} from './utilities/helper-functions.utility';

describe('UniversalAnalyticsEcommerceEventsService', () => {
	let service: UniversalAnalyticsEcommerceEventsService;
	let trackingGoogleTagManagerService: TrackingGoogleTagManagerService;

	let dataLayer: GtmEvent[];

	let spyOnPushToDataLayer: jest.SpyInstance<void, [obj: GtmEvent]>;

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
		trackingGoogleTagManagerService = TestBed.inject(
			TrackingGoogleTagManagerService,
		);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#triggerProductImpressionsEvent', () => {
		let spyOnTriggerProductImpressionsEvent: jest.SpyInstance<
			void,
			[
				productImpressionsEvent: UniversalAnalyticsEcommerceProductImpressionsEvent,
			]
		>;
		let spyOnTransformProductImpressionEventToGtmEvent: jest.SpyInstance<
			any,
			unknown[]
		>;

		beforeEach(() => {
			spyOnTriggerProductImpressionsEvent = jest.spyOn(
				service,
				'triggerProductImpressionsEvent',
			);
			spyOnTransformProductImpressionEventToGtmEvent = jest.spyOn(
				service as any,
				'transformProductImpressionEventToGtmEvent',
			);
			spyOnPushToDataLayer = jest.spyOn(
				trackingGoogleTagManagerService,
				'pushToDataLayer',
			);

			service.triggerProductImpressionsEvent(productImpressionEvent);
		});

		it('should be called with an argument of type UniversalAnalyticsEcommerceProductImpressionsEvent', () => {
			expect(spyOnTriggerProductImpressionsEvent).toBeCalledWith(
				productImpressionEvent,
			);
		});

		it('should call #transformProductImpressionEventToGtmEvent once', () => {
			expect(spyOnTransformProductImpressionEventToGtmEvent).toBeCalledTimes(1);
		});

		it('should call the service method pushToDataLayer() once', () => {
			expect(spyOnPushToDataLayer).toBeCalledTimes(1);
		});

		it('should push an "angularProductImpressions" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularProductImpressions',
			);
		});
	});

	describe('#transformProductImpressionEventToGtmEvent', () => {
		it('should return a GtmEvent', () => {
			const returnValue = service['transformProductImpressionEventToGtmEvent'](
				productImpressionEvent,
			);

			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
			expect(returnValue.event).toBe('angularProductImpressions');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceProductImpressionsEvent', () => {
			const spyOnTransformProductImpressionEventToGtmEvent = jest.spyOn(
				service as any,
				'transformProductImpressionEventToGtmEvent',
			);

			service['transformProductImpressionEventToGtmEvent'](
				productImpressionEvent,
			);

			expect(spyOnTransformProductImpressionEventToGtmEvent).toBeCalledWith(
				productImpressionEvent,
			);
			expect(
				isOfTypeUniversalAnalyticsEcommerceProductImpressionsEvent(
					productImpressionEvent,
				),
			).toBe(true);
		});
	});

	describe('#triggerProductClickEvent', () => {
		let spyOnTriggerProductClickEvent: jest.SpyInstance<
			void,
			[productClickEvent: UniversalAnalyticsEcommerceProductClickEvent]
		>;
		let spyOnTransformProductClickEventToGtmEvent: jest.SpyInstance<
			any,
			unknown[]
		>;

		let triggerProductClickEventReturnValue: void;

		beforeEach(() => {
			spyOnTriggerProductClickEvent = jest.spyOn(
				service,
				'triggerProductClickEvent',
			);
			spyOnTransformProductClickEventToGtmEvent = jest.spyOn(
				service as any,
				'transformProductClickEventToGtmEvent',
			);
			spyOnPushToDataLayer = jest.spyOn(
				trackingGoogleTagManagerService,
				'pushToDataLayer',
			);

			triggerProductClickEventReturnValue =
				service.triggerProductClickEvent(productClickEvent);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceProductClickEvent', () => {
			expect(
				isOfTypeUniversalAnalyticsEcommerceProductClickEvent(productClickEvent),
			).toBe(true);
			expect(spyOnTriggerProductClickEvent).toBeCalled();
		});

		it('should call #transformProductClickEventToGtmEvent once', () => {
			expect(spyOnTransformProductClickEventToGtmEvent).toBeCalledTimes(1);
		});

		it('should call pushToDataLayer() from service trackingGoogleTagManagerService once', () => {
			expect(spyOnPushToDataLayer).toBeCalledTimes(1);
		});

		it('should return void', () => {
			expect(triggerProductClickEventReturnValue).toBe(undefined);
		});

		it('should push an "angularProductClick" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularProductClick');
		});
	});

	describe('#transformProductClickEventToGtmEvent', () => {
		let spyOnTransformProductClickEventToGtmEvent: jest.SpyInstance<
			any,
			unknown[]
		>;
		let returnValue: GtmEvent;

		beforeEach(() => {
			spyOnTransformProductClickEventToGtmEvent = jest.spyOn(
				service as any,
				'transformProductClickEventToGtmEvent',
			);

			returnValue =
				service['transformProductClickEventToGtmEvent'](productClickEvent);
		});

		it('should return a GtmEvent', () => {
			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
			expect(returnValue.event).toBe('angularProductClick');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceProductClickEvent', () => {
			expect(spyOnTransformProductClickEventToGtmEvent).toBeCalledWith(
				productClickEvent,
			);
			expect(
				isOfTypeUniversalAnalyticsEcommerceProductClickEvent(productClickEvent),
			).toBe(true);
		});
	});

	describe('#triggerViewProductDetailsEvent', () => {
		let spyOnTriggerViewProductDetailsEvent: jest.SpyInstance<
			void,
			[
				viewProductDetailsEvent: UniversalAnalyticsEcommerceViewProductDetailsEvent,
			]
		>;
		let spyOnTransformViewProductDetailsToGtmEvent: jest.SpyInstance<
			any,
			unknown[]
		>;
		let triggerViewProductDetailsEventReturnValue: void;

		beforeEach(() => {
			spyOnTriggerViewProductDetailsEvent = jest.spyOn(
				service,
				'triggerViewProductDetailsEvent',
			);
			spyOnTransformViewProductDetailsToGtmEvent = jest.spyOn(
				service as any,
				'transformViewProductDetailsToGtmEvent',
			);
			spyOnPushToDataLayer = jest.spyOn(
				trackingGoogleTagManagerService,
				'pushToDataLayer',
			);
			triggerViewProductDetailsEventReturnValue =
				service.triggerViewProductDetailsEvent(ViewProductDetailsEvent);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceViewProductDetailsEvent', () => {
			expect(
				isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent(
					ViewProductDetailsEvent,
				),
			).toBe(true);
			expect(spyOnTriggerViewProductDetailsEvent).toBeCalled();
		});

		it('should call #transformViewProductDetailsToGtmEvent once', () => {
			expect(spyOnTransformViewProductDetailsToGtmEvent).toBeCalledTimes(1);
		});

		it('should call pushToDataLayer() from service trackingGoogleTagManagerService once', () => {
			expect(spyOnPushToDataLayer).toBeCalledTimes(1);
		});

		it('should return void', () => {
			expect(triggerViewProductDetailsEventReturnValue).toBe(undefined);
		});

		it('should push an "angularViewProductDetails" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularViewProductDetails',
			);
		});
	});

	describe('#triggerAddToCartEvent', () => {
		let spyOnTriggerAddToCartEvent: jest.SpyInstance<
			void,
			[addToCartEvent: UniversalAnalyticsEcommerceAddToCartEvent]
		>;
		let spyOnTransformAddToCartEventToGtmEvent: jest.SpyInstance<
			any,
			unknown[]
		>;
		let triggerAddToCartEventReturnValue: void;

		beforeEach(() => {
			spyOnTriggerAddToCartEvent = jest.spyOn(service, 'triggerAddToCartEvent');

			spyOnTransformAddToCartEventToGtmEvent = jest.spyOn(
				service as any,
				'transformAddToCartEventToGtmEvent',
			);

			spyOnPushToDataLayer = jest.spyOn(
				trackingGoogleTagManagerService,
				'pushToDataLayer',
			);

			triggerAddToCartEventReturnValue =
				service.triggerAddToCartEvent(addToCartEvent);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceAddToCartEvent', () => {
			expect(
				isOfTypeUniversalAnalyticsEcommerceAddToCartEvent(addToCartEvent),
			).toBe(true);
			expect(spyOnTriggerAddToCartEvent).toBeCalledWith(addToCartEvent);
			expect(spyOnTriggerAddToCartEvent).toBeCalled();
		});

		it('should call #transformAddToCartEventToGtmEvent once', () => {
			expect(spyOnTransformAddToCartEventToGtmEvent).toBeCalledTimes(1);
		});

		it('should call pushToDataLayer() from service trackingGoogleTagManagerService once', () => {
			expect(spyOnPushToDataLayer).toBeCalledTimes(1);
		});

		it('should return void', () => {
			expect(triggerAddToCartEventReturnValue).toBe(undefined);
		});

		it('should push an "angularViewProductDetails" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularAddToCart');
		});
	});

	describe('#transformAddToCartEventToGtmEvent', () => {
		let spyOnTransformAddToCartEventToGtmEvent: jest.SpyInstance<
			any,
			unknown[]
		>;
		let returnValue: GtmEvent;

		beforeEach(() => {
			spyOnTransformAddToCartEventToGtmEvent = jest.spyOn(
				service as any,
				'transformAddToCartEventToGtmEvent',
			);

			returnValue =
				service['transformAddToCartEventToGtmEvent'](addToCartEvent);
		});

		it('should return a GtmEvent', () => {
			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
			expect(returnValue.event).toBe('angularAddToCart');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceAddToCartEvent', () => {
			expect(spyOnTransformAddToCartEventToGtmEvent).toBeCalledWith(
				addToCartEvent,
			);
			expect(
				isOfTypeUniversalAnalyticsEcommerceAddToCartEvent(addToCartEvent),
			).toBe(true);
		});
	});

	describe('#triggerRemoveFromCartEvent', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerPromotionImpressionEvent', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerPromotionClickEvent', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerCheckoutStepEvent', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerCheckoutOptionEvent', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerPurchaseEvent', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerRefundEvent', () => {
		it('', () => {
			//
		});
	});
});
