import { TestBed } from '@angular/core/testing';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { UniversalAnalyticsEcommerceEventsService } from './universal-analytics-ecommerce-events.service';
import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import {
	productImpressionEventMock,
	productClickEvent,
	ViewProductDetailsEvent,
	addToCartEvent,
} from './utilities/universal-analytics-ecommerce-event-objects';

import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceProductClickEvent,
	isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent,
	isOfTypeUniversalAnalyticsEcommerceAddToCartEvent,
} from './utilities/helper-functions.utility';

describe('UniversalAnalyticsEcommerceEventsService', () => {
	let service: UniversalAnalyticsEcommerceEventsService;
	let googleTagManagerService: GoogleTagManagerService;

	let dataLayer: GtmEvent[];

	let spyOnPushToDataLayer: jest.SpyInstance<void, [obj: GtmEvent]>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'GoogleTagManagerConfig',
					useValue: { id: 'test_id' },
				},
			],
		});
		service = TestBed.inject(UniversalAnalyticsEcommerceEventsService);
		googleTagManagerService = TestBed.inject(GoogleTagManagerService);

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

		beforeEach(() => {
			spyOnTriggerProductImpressionsEvent = jest.spyOn(
				service,
				'triggerProductImpressionsEvent',
			);

			service.triggerProductImpressionsEvent(productImpressionEventMock);
		});

		it('should be called with an argument of type UniversalAnalyticsEcommerceProductImpressionsEvent', () => {
			expect(spyOnTriggerProductImpressionsEvent).toBeCalledWith(
				productImpressionEventMock,
			);
		});

		it('should push an "angularProductImpressions" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularProductImpressions',
			);
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
				googleTagManagerService,
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

		it('should call pushToDataLayer() from service GoogleTagManagerService once', () => {
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
				googleTagManagerService,
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

		it('should call pushToDataLayer() from service GoogleTagManagerService once', () => {
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
				googleTagManagerService,
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

		it('should call pushToDataLayer() from service GoogleTagManagerService once', () => {
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
