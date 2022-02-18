import { TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { ViewProductDetailsEvent } from './view-product-details-event.class';

import { viewProductDetailsEventMock } from '../utilities/universal-analytics-ecommerce-event-objects';
import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '../utilities/helper-functions.utility';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

describe('ViewProductDetailsEvent', () => {
	let googleTagManagerService: GoogleTagManagerService;

	let viewProductDetailsEventInstance: ViewProductDetailsEvent;

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

		viewProductDetailsEventInstance = new ViewProductDetailsEvent(
			googleTagManagerService,
		);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(viewProductDetailsEventInstance).toBeTruthy();
	});

	describe('#transformToGtmEvent', () => {
		let returnValue: GtmEvent;
		let spyOnTransformToGtmEvent: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnTransformToGtmEvent = jest.spyOn(
				viewProductDetailsEventInstance as any,
				'transformToGtmEvent',
			);

			returnValue = viewProductDetailsEventInstance['transformToGtmEvent'](
				viewProductDetailsEventMock,
			);
		});

		it('should have a GtmEvent type return value', () => {
			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
		});

		it('should return an "angularViewProductDetails" event', () => {
			expect(returnValue.event).toBe('angularViewProductDetails');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceViewProductDetailsEvent', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledWith(
				viewProductDetailsEventMock,
			);
			expect(
				isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent(
					viewProductDetailsEventMock,
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
			spyOnTrigger = jest.spyOn(viewProductDetailsEventInstance, 'trigger');

			viewProductDetailsEventInstance.trigger(viewProductDetailsEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceProductImpressionsEvent', () => {
			expect(spyOnTrigger).toBeCalledWith(viewProductDetailsEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent(
					viewProductDetailsEventMock,
				),
			).toBe(true);
		});

		it('should push an "angularViewProductDetails" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularViewProductDetails',
			);
		});
	});
});
