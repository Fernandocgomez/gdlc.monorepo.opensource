import { TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { AddToCartEvent } from './add-to-cart-event.class';

import { addToCartEventMock } from '../utilities/universal-analytics-ecommerce-event-objects';
import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceEvent,
} from '../utilities/helper-functions.utility';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceEvent,
} from '@multi-step-funnels/tracking/tracking-models';

describe('AddToCartEvent', () => {
	let googleTagManagerService: GoogleTagManagerService;

	let addToCartEventInstance: AddToCartEvent;

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

		addToCartEventInstance = new AddToCartEvent(googleTagManagerService);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(addToCartEventInstance).toBeTruthy();
	});

	describe('#transformToGtmEvent', () => {
		let returnValue: GtmEvent;
		let spyOnTransformToGtmEvent: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnTransformToGtmEvent = jest.spyOn(
				addToCartEventInstance as any,
				'transformToGtmEvent',
			);

			returnValue =
				addToCartEventInstance['transformToGtmEvent'](addToCartEventMock);
		});

		it('should have a GtmEvent type return value', () => {
			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
		});

		it('should return an "angularAddToCart" event', () => {
			expect(returnValue.event).toBe('angularAddToCart');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledWith(addToCartEventMock);
			expect(isOfTypeUniversalAnalyticsEcommerceEvent(addToCartEventMock)).toBe(
				true,
			);
		});
	});

	describe('#trigger', () => {
		let spyOnTrigger: jest.SpyInstance<
			void,
			[event: UniversalAnalyticsEcommerceEvent]
		>;

		beforeEach(() => {
			spyOnTrigger = jest.spyOn(addToCartEventInstance, 'trigger');

			addToCartEventInstance.trigger(addToCartEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTrigger).toBeCalledWith(addToCartEventMock);
			expect(isOfTypeUniversalAnalyticsEcommerceEvent(addToCartEventMock)).toBe(
				true,
			);
		});

		it('should push an "angularAddToCart" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularAddToCart');
		});
	});
});
