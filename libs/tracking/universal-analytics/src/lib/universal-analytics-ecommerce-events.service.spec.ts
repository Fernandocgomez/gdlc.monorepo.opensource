import { TestBed } from '@angular/core/testing';

import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceItem,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { UniversalAnalyticsEcommerceEventsService } from './universal-analytics-ecommerce-events.service';

import {
	productClickEventMock,
	viewProductDetailsEventMock,
	addToCartEventMock,
	removeFromCartEventMock,
	ecommerceProductsMock,
} from './utilities/universal-analytics-ecommerce-event-objects';

import {
	isOfTypeUniversalAnalyticsEcommerceProductClickEvent,
	isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent,
	isOfTypeUniversalAnalyticsEcommerceAddToCartEvent,
	isOfTypeUniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	isAnArrayOfTypeUniversalAnalyticsEcommerceItem,
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
				products: UniversalAnalyticsEcommerceItem[],
				currencyCode?: string | undefined,
			]
		>;

		let triggerProductImpressionsEventReturnValue: void;

		const secondArgument = 'EUR';

		beforeEach(() => {
			spyOnTriggerProductImpressionsEvent = jest.spyOn(
				service,
				'triggerProductImpressionsEvent',
			);

			triggerProductImpressionsEventReturnValue =
				service.triggerProductImpressionsEvent(
					ecommerceProductsMock,
					secondArgument,
				);
		});

		it('should push an "angularProductImpressions" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe(
				'angularProductImpressions',
			);
		});

		it('can be call with two or one argument', () => {
			expect(spyOnTriggerProductImpressionsEvent).toBeCalledWith(
				ecommerceProductsMock,
				secondArgument,
			);
			service.triggerProductImpressionsEvent(ecommerceProductsMock);
			expect(spyOnTriggerProductImpressionsEvent).toBeCalledWith(
				ecommerceProductsMock,
			);
		});

		it('should return void', () => {
			expect(triggerProductImpressionsEventReturnValue).toBe(undefined);
		});

		describe('first argument "products"', () => {
			it('should be of type UniversalAnalyticsEcommerceItem[]', () => {
				expect(
					isAnArrayOfTypeUniversalAnalyticsEcommerceItem(ecommerceProductsMock),
				).toBe(true);
				expect(Array.isArray(ecommerceProductsMock)).toBe(true);
			});
		});

		describe('second argument "currencyCode"', () => {
			it('should be of type string', () => {
				expect(typeof secondArgument).toBe('string');
			});

			it('should have a default value equal to "USD"', () => {
				service.triggerProductImpressionsEvent(ecommerceProductsMock);
				expect(
					dataLayer[dataLayer.length - 1]['ecommerce']['currencyCode'],
				).toBe('USD');
				expect(spyOnTriggerProductImpressionsEvent).toHaveBeenLastCalledWith(
					ecommerceProductsMock,
				);
			});
		});
	});

	describe('#triggerProductClickEvent', () => {
		let spyOnTriggerProductClickEvent: jest.SpyInstance<
			void,
			[
				products: UniversalAnalyticsEcommerceItem[],
				searchList?: string | undefined,
			]
		>;

		let triggerProductClickEventReturnValue: void;

		const secondArgument = 'Search Result';

		beforeEach(() => {
			spyOnTriggerProductClickEvent = jest.spyOn(
				service,
				'triggerProductClickEvent',
			);

			triggerProductClickEventReturnValue = service.triggerProductClickEvent(
				ecommerceProductsMock,
				secondArgument,
			);
		});

		it('should push an "angularProductClick" event to the dataLayer', () => {
			expect(dataLayer[dataLayer.length - 1].event).toBe('angularProductClick');
		});

		it('can be call with two or one argument', () => {
			expect(spyOnTriggerProductClickEvent).toBeCalledWith(
				ecommerceProductsMock,
				secondArgument,
			);
			service.triggerProductClickEvent(ecommerceProductsMock);
			expect(spyOnTriggerProductClickEvent).toBeCalledWith(
				ecommerceProductsMock,
			);
		});

		it('should return void', () => {
			expect(triggerProductClickEventReturnValue).toBe(undefined);
		});

		describe('first argument "products"', () => {
			it('should be of type UniversalAnalyticsEcommerceItem[]', () => {
				expect(
					isAnArrayOfTypeUniversalAnalyticsEcommerceItem(ecommerceProductsMock),
				).toBe(true);
				expect(Array.isArray(ecommerceProductsMock)).toBe(true);
			});
		});

		describe('second argument "searchList"', () => {
			it('should be of type String', () => {
				expect(typeof secondArgument).toBe('string');
			});

			it('should have a default value equal to empty string', () => {
				service.triggerProductClickEvent(ecommerceProductsMock);
				expect(
					dataLayer[dataLayer.length - 1]['ecommerce']['click']['actionField'][
						'list'
					],
				).toBe('');
				expect(spyOnTriggerProductClickEvent).toHaveBeenLastCalledWith(
					ecommerceProductsMock,
				);
			});
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
