import { TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { RemoveFromCartEvent } from './remove-from-cart-event.class';

import { removeFromCartEventMock } from '../utilities/universal-analytics-ecommerce-event-objects';

import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceEvent,
} from '../utilities/helper-functions.utility';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceEvent,
} from '@multi-step-funnels/tracking/tracking-models';

describe('RemoveFromCartEvent', () => {
	let googleTagManagerService: GoogleTagManagerService;

	let removeFromCartEventInstance: RemoveFromCartEvent;

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

		removeFromCartEventInstance = new RemoveFromCartEvent(
			googleTagManagerService,
		);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(removeFromCartEventInstance).toBeTruthy();
	});

	describe('#transformToGtmEvent', () => {
		let returnValue: GtmEvent;

		let spyOnTransformToGtmEvent: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnTransformToGtmEvent = jest.spyOn(
				removeFromCartEventInstance as any,
				'transformToGtmEvent',
			);

			returnValue = removeFromCartEventInstance['transformToGtmEvent'](
				removeFromCartEventMock,
			);
		});

		it('should have a GtmEvent type return value', () => {
			expect(isOfTypeGtmEvent(returnValue)).toBe(true);
		});

		it('should return an "angularRemoveFromCart" event', () => {
			expect(returnValue.event).toBe('angularRemoveFromCart');
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledWith(removeFromCartEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(removeFromCartEventMock),
			).toBe(true);
		});
	});

	describe('#trigger', () => {
		let spyOnTrigger: jest.SpyInstance<
			void,
			[event: UniversalAnalyticsEcommerceEvent]
		>;

		beforeEach(() => {
			spyOnTrigger = jest.spyOn(removeFromCartEventInstance, 'trigger');

			removeFromCartEventInstance.trigger(removeFromCartEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTrigger).toBeCalledWith(removeFromCartEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(removeFromCartEventMock),
			).toBe(true);
		});

		it('should push an "angularRemoveFromCart" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularRemoveFromCart',
			);
		});
	});
});
