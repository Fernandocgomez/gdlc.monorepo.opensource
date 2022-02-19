import { TestBed } from '@angular/core/testing';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { UniversalAnalyticsEcommerceEventsService } from './universal-analytics-ecommerce-events.service';

import {
	productImpressionEventMock,
	productClickEventMock,
	viewProductDetailsEventMock,
	addToCartEventMock,
	removeFromCartEventMock,
} from './utilities/universal-analytics-ecommerce-event-objects';

import {
	isOfTypeUniversalAnalyticsEcommerceProductClickEvent,
	isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent,
	isOfTypeUniversalAnalyticsEcommerceAddToCartEvent,
	isOfTypeUniversalAnalyticsEcommerceRemoveProductFromCartEvent,
} from './utilities/helper-functions.utility';

describe('UniversalAnalyticsEcommerceEventsService', () => {
	let service: UniversalAnalyticsEcommerceEventsService;

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
		service = TestBed.inject(UniversalAnalyticsEcommerceEventsService);

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

		let triggerProductClickEventReturnValue: void;

		beforeEach(() => {
			spyOnTriggerProductClickEvent = jest.spyOn(
				service,
				'triggerProductClickEvent',
			);

			triggerProductClickEventReturnValue = service.triggerProductClickEvent(
				productClickEventMock,
			);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceProductClickEvent', () => {
			expect(
				isOfTypeUniversalAnalyticsEcommerceProductClickEvent(
					productClickEventMock,
				),
			).toBe(true);
			expect(spyOnTriggerProductClickEvent).toBeCalledWith(
				productClickEventMock,
			);
		});

		it('should return void', () => {
			expect(triggerProductClickEventReturnValue).toBe(undefined);
		});

		it('should push an "angularProductClick" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularProductClick');
		});
	});

	describe('#triggerViewProductDetailsEvent', () => {
		let spyOnTriggerViewProductDetailsEvent: jest.SpyInstance<
			void,
			[
				viewProductDetailsEvent: UniversalAnalyticsEcommerceViewProductDetailsEvent,
			]
		>;
		let triggerViewProductDetailsEventReturnValue: void;

		beforeEach(() => {
			spyOnTriggerViewProductDetailsEvent = jest.spyOn(
				service,
				'triggerViewProductDetailsEvent',
			);
			triggerViewProductDetailsEventReturnValue =
				service.triggerViewProductDetailsEvent(viewProductDetailsEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceViewProductDetailsEvent', () => {
			expect(
				isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent(
					viewProductDetailsEventMock,
				),
			).toBe(true);
			expect(spyOnTriggerViewProductDetailsEvent).toBeCalled();
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

		let triggerAddToCartEventReturnValue: void;

		beforeEach(() => {
			spyOnTriggerAddToCartEvent = jest.spyOn(service, 'triggerAddToCartEvent');

			triggerAddToCartEventReturnValue =
				service.triggerAddToCartEvent(addToCartEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceAddToCartEvent', () => {
			expect(
				isOfTypeUniversalAnalyticsEcommerceAddToCartEvent(addToCartEventMock),
			).toBe(true);
			expect(spyOnTriggerAddToCartEvent).toBeCalledWith(addToCartEventMock);
			expect(spyOnTriggerAddToCartEvent).toBeCalled();
		});

		it('should return void', () => {
			expect(triggerAddToCartEventReturnValue).toBe(undefined);
		});

		it('should push an "angularAddToCart" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularAddToCart');
		});
	});

	describe('#triggerRemoveFromCartEvent', () => {
		let spyOnTriggerRemoveFromCartEvent: jest.SpyInstance<
			void,
			[
				removeFromCartEvent: UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
			]
		>;

		let triggerRemoveFromCartEventReturnValue: void;

		beforeEach(() => {
			spyOnTriggerRemoveFromCartEvent = jest.spyOn(
				service,
				'triggerRemoveFromCartEvent',
			);

			triggerRemoveFromCartEventReturnValue =
				service.triggerRemoveFromCartEvent(removeFromCartEventMock);
		});

		it('should take an argument of type UniversalAnalyticsEcommerceRemoveProductFromCartEvent', () => {
			expect(
				isOfTypeUniversalAnalyticsEcommerceRemoveProductFromCartEvent(
					removeFromCartEventMock,
				),
			).toBe(true);
			expect(spyOnTriggerRemoveFromCartEvent).toBeCalledWith(
				removeFromCartEventMock,
			);
		});

		it('should return void', () => {
			expect(triggerRemoveFromCartEventReturnValue).toBe(undefined);
		});

		it('should push an "angularRemoveFromCart" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularRemoveFromCart',
			);
		});
	});
});
