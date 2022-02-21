import { TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from '@multi-step-funnels/tracking-google-tag-manager';

import { PromotionClickEvent } from './promotion-click-event.class';

import { promotionClickEventMock } from '../utilities/universal-analytics-ecommerce-event-mock-objects';

import {
	isOfTypeGtmEvent,
	isOfTypeUniversalAnalyticsEcommerceEvent,
} from '../utilities/helper-functions.utility';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceEvent,
} from '@multi-step-funnels/tracking/tracking-models';

describe('PromotionClickEvent', () => {
	let googleTagManagerService: GoogleTagManagerService;

	let promotionClickEventInstance: PromotionClickEvent;

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

		promotionClickEventInstance = new PromotionClickEvent(
			googleTagManagerService,
		);

		dataLayer = window.dataLayer || [];
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(promotionClickEventInstance).toBeTruthy();
	});

	describe('#transformToGtmEvent', () => {
		let returnValue: GtmEvent;

		let spyOnTransformToGtmEvent: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnTransformToGtmEvent = jest.spyOn(
				promotionClickEventInstance as any,
				'transformToGtmEvent',
			);

			returnValue = promotionClickEventInstance['transformToGtmEvent'](
				promotionClickEventMock,
			);
		});

		describe('return value', () => {
			it('should be of type GtmEvent', () => {
				expect(isOfTypeGtmEvent(returnValue)).toBe(true);
			});

			it('should have a property event equals to "angularPromoClick"', () => {
				expect(returnValue.event).toBe('angularPromoClick');
			});
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledWith(promotionClickEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(promotionClickEventMock),
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
			spyOnTrigger = jest.spyOn(promotionClickEventInstance, 'trigger');

			triggerReturnValue = promotionClickEventInstance.trigger(
				promotionClickEventMock,
			);
		});

		it('should push an "angularPromoClick" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularPromoClick');
		});

		it('should return void', () => {
			expect(triggerReturnValue).toBe(undefined);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceEvent', () => {
			expect(spyOnTrigger).toBeCalledWith(promotionClickEventMock);
			expect(
				isOfTypeUniversalAnalyticsEcommerceEvent(promotionClickEventMock),
			).toBe(true);
		});
	});
});
