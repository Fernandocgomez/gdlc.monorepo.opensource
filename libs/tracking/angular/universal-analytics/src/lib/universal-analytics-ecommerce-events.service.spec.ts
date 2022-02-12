import { TestBed } from '@angular/core/testing';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { UniversalAnalyticsEcommerceEventsService } from './universal-analytics-ecommerce-events.service';
import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

import { productImpressionEvent } from './utilities/universal-analytics-ecommerce-event-objects';

describe('UniversalAnalyticsEcommerceEventsService', () => {
	let service: UniversalAnalyticsEcommerceEventsService;
	let trackingGoogleTagManagerService: TrackingGoogleTagManagerService;
	let dataLayer: GtmEvent[];

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
		let spyOnPushToDataLayer: jest.SpyInstance<void, [obj: GtmEvent]>;

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

		afterEach(() => {
			window.dataLayer = [];
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

			const isGtmEventType = (value: any) => {
				return (value as GtmEvent).event !== undefined;
			};

			expect(isGtmEventType(returnValue)).toBe(true);
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

			const isUniversalAnalyticsEcommerceProductImpressionsEventType = (
				value: any,
			) => {
				return (
					(value as UniversalAnalyticsEcommerceProductImpressionsEvent)
						.ecommerce !== undefined
				);
			};

			expect(spyOnTransformProductImpressionEventToGtmEvent).toBeCalledWith(
				productImpressionEvent,
			);
			expect(
				isUniversalAnalyticsEcommerceProductImpressionsEventType(
					productImpressionEvent,
				),
			).toBe(true);
		});
	});

	describe('#triggerProductClick', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerViewProductDetails', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerAddToCart', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerRemoveFromCart', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerPromotionImpression', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerPromotionClick', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerCheckoutStep', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerCheckoutOption', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerPurchase', () => {
		it('', () => {
			//
		});
	});

	describe('#triggerRefund', () => {
		it('', () => {
			//
		});
	});
});
