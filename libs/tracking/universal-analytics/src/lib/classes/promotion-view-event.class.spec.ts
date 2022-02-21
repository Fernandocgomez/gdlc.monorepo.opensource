import { TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { PromotionViewEvent } from './promotion-view-event.class';

import { promotionViewEventMock } from '../utilities/universal-analytics-ecommerce-event-mock-objects';

import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceEvent,
} from '../utilities/helper-functions.utility';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceEvent,
} from '@multi-step-funnels/tracking/tracking-models';

describe('PromotionViewEvent', () => {
	let googleTagManagerService: GoogleTagManagerService;

	let promotionViewEventInstance: PromotionViewEvent;

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

		promotionViewEventInstance = new PromotionViewEvent(
			googleTagManagerService,
		);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(promotionViewEventInstance).toBeTruthy();
	});

	describe('#transformToGtmEvent', () => {
		let returnValue: GtmEvent;

		let spyOnTransformToGtmEvent: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnTransformToGtmEvent = jest.spyOn(
				promotionViewEventInstance as any,
				'transformToGtmEvent',
			);

			returnValue = promotionViewEventInstance['transformToGtmEvent'](
				promotionViewEventMock,
			);
		});

		describe('return value', () => {
			it('should be of type GtmEvent', () => {
				expect(isOfTypeGtmEvent(returnValue)).toBe(true);
			});

			it('should have a property event equals to "angularPromoView"', () => {
				expect(returnValue.event).toBe('angularPromoView');
			});
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledWith(promotionViewEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(promotionViewEventMock),
			).toBe(true);
		});
	});

	describe('#trigger', () => {
		let spyOnTrigger: jest.SpyInstance<
			void,
			[event: UniversalAnalyticsEcommerceEvent]
		>;

		let triggerReturnValue: void;

		beforeEach(() => {
			spyOnTrigger = jest.spyOn(promotionViewEventInstance, 'trigger');

			triggerReturnValue = promotionViewEventInstance.trigger(
				promotionViewEventMock,
			);
		});

		it('should push an "angularPromoView" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularPromoView');
		});

		it('should return void', () => {
			expect(triggerReturnValue).toBe(undefined);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTrigger).toBeCalledWith(promotionViewEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(promotionViewEventMock),
			).toBe(true);
		});
	});
});
