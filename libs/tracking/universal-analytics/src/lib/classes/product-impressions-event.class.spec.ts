import { TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { ProductImpressionsEvent } from './product-impressions-event.class';

import { productImpressionEventMock } from '../utilities/universal-analytics-ecommerce-event-objects';
import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceProductImpressionsEvent,
} from '../utilities/helper-functions.utility';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

describe('UniversalAnalyticsCustomEventsService', () => {
	let googleTagManagerService: GoogleTagManagerService;

	let productImpressionsEventInstance: ProductImpressionsEvent;

	let dataLayer: GtmEvent[];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'GoogleTagManagerConfig',
					useValue: { id: 'test_id' },
				},
			],
		});

		googleTagManagerService = TestBed.inject(GoogleTagManagerService);

		productImpressionsEventInstance = new ProductImpressionsEvent(
			googleTagManagerService,
		);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(productImpressionsEventInstance).toBeTruthy();
	});

	describe('#transformToGtmEvent', () => {
		let returnValue: GtmEvent;
		let spyOnTransformToGtmEvent: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnTransformToGtmEvent = jest.spyOn(
				productImpressionsEventInstance as any,
				'transformToGtmEvent',
			);

			returnValue = productImpressionsEventInstance['transformToGtmEvent'](
				productImpressionEventMock,
			);
		});

		it('should have a GtmEvent type return value', () => {
			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
		});

		it('should return an "angularProductImpressions" event', () => {
			expect(returnValue.event).toBe('angularProductImpressions');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceProductImpressionsEvent', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledWith(
				productImpressionEventMock,
			);
			expect(
				isOfTypeUniversalAnalyticsEcommerceProductImpressionsEvent(
					productImpressionEventMock,
				),
			).toBe(true);
		});
	});

	describe('#trigger', () => {
		let spyOnTrigger: jest.SpyInstance<
			void,
			[
				event:
					| UniversalAnalyticsEcommerceProductImpressionsEvent
					| UniversalAnalyticsEcommerceProductClickEvent
					| UniversalAnalyticsEcommerceViewProductDetailsEvent
					| UniversalAnalyticsEcommerceAddToCartEvent,
			]
		>;

		beforeEach(() => {
			spyOnTrigger = jest.spyOn(productImpressionsEventInstance, 'trigger');

			productImpressionsEventInstance.trigger(productImpressionEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceProductImpressionsEvent', () => {
			expect(spyOnTrigger).toBeCalledWith(productImpressionEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceProductImpressionsEvent(
					productImpressionEventMock,
				),
			).toBe(true);
		});

		it('should push an "angularProductImpressions" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularProductImpressions',
			);
		});
	});
});
