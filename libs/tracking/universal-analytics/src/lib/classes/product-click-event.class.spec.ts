import { TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { ProductClickEvent } from './product-click-event.class';

import { productClickEventMock } from '../utilities/universal-analytics-ecommerce-event-objects';
import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceEvent,
} from '../utilities/helper-functions.utility';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceEvent,
} from '@multi-step-funnels/tracking/tracking-models';

describe('ProductClickEvent', () => {
	let googleTagManagerService: GoogleTagManagerService;

	let productClickEventInstance: ProductClickEvent;

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

		productClickEventInstance = new ProductClickEvent(googleTagManagerService);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(productClickEventInstance).toBeTruthy();
	});

	describe('#transformToGtmEvent', () => {
		let returnValue: GtmEvent;
		let spyOnTransformToGtmEvent: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnTransformToGtmEvent = jest.spyOn(
				productClickEventInstance as any,
				'transformToGtmEvent',
			);

			returnValue = productClickEventInstance['transformToGtmEvent'](
				productClickEventMock,
			);
		});

		it('should have a GtmEvent type return value', () => {
			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
		});

		it('should return an "angularProductClick" event', () => {
			expect(returnValue.event).toBe('angularProductClick');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledWith(productClickEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(productClickEventMock),
			).toBe(true);
		});
	});

	describe('#trigger', () => {
		let spyOnTrigger: jest.SpyInstance<
			void,
			[event: UniversalAnalyticsEcommerceEvent]
		>;

		beforeEach(() => {
			spyOnTrigger = jest.spyOn(productClickEventInstance, 'trigger');

			productClickEventInstance.trigger(productClickEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTrigger).toBeCalledWith(productClickEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(productClickEventMock),
			).toBe(true);
		});

		it('should push an "angularProductClick" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularProductClick');
		});
	});
});
