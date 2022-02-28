import { TestBed } from '@angular/core/testing';

import {
	CurrencyCode,
	listOfCurrencyCodeSupportedByUA,
	UaEcommerceProduct,
} from '../models';

import { GtmUaEcommerceEventsService } from './gtm-ua-ecommerce-events.service';

import { uaEcommerceProductsMockUp, DataLayer } from '../utilities';

describe('GtmUaEcommerceEventsService', () => {
	let service: GtmUaEcommerceEventsService;

	let spyOnSendProductImpressionsEvent: jest.SpyInstance<
		void,
		[products: UaEcommerceProduct[], currencyCode?: CurrencyCode]
	>;

	let invalidProductsArg: UaEcommerceProduct[];
	const productsArg = uaEcommerceProductsMockUp;
	const currencyCodeArg: CurrencyCode = 'EUR';

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'GtmConfig',
					useValue: { id: 'test_id' },
				},
			],
		});
		service = TestBed.inject(GtmUaEcommerceEventsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#sendProductImpressionsEvent', () => {
		describe('pushed object to dataLayer', () => {
			beforeEach(() => {
				service.sendProductImpressionsEvent(productsArg, currencyCodeArg);
			});

			it('should have the property "event" equal to "angularEcommerce"', () => {
				expect(DataLayer.getLastElement().event).toBe('angularEcommerce');
			});

			it('should have the property "currencyCode" equal to "EUR"', () => {
				const currencyCodeValue =
					DataLayer.getLastElement()['ecommerce']['currencyCode'];
				expect(currencyCodeValue).toBe('EUR');
			});

			it('should have the property "impressions" pointing to an Array with 2 elements', () => {
				const productsImpression =
					DataLayer.getLastElement()['ecommerce']['impressions'];
				expect(productsImpression.length).toBe(2);
			});

			it('should have the property "category" equals to "ecommerce"', () => {
				expect(DataLayer.getLastElement()['category']).toBe('ecommerce');
			});

			it('should have the property "action" equals to "impressions"', () => {
				expect(DataLayer.getLastElement()['action']).toBe('impressions');
			});

			it('should have the property "label" equals to "product impressions"', () => {
				expect(DataLayer.getLastElement()['label']).toBe('product impressions');
			});

			it('should have the property "nonInteraction" equals to "false"', () => {
				expect(DataLayer.getLastElement()['nonInteraction']).toBe(false);
			});
		});

		describe('"products" argument', () => {
			beforeEach(() => {
				spyOnSendProductImpressionsEvent = jest.spyOn(
					service,
					'sendProductImpressionsEvent',
				);

				invalidProductsArg = [...productsArg];

				service.sendProductImpressionsEvent(invalidProductsArg);
			});

			it('should be an Array', () => {
				expect(Array.isArray(productsArg)).toBe(true);
			});

			it('should throw an error when passing a product with an id equals to an empty string.', () => {
				invalidProductsArg[0].id = '';
				expect(spyOnSendProductImpressionsEvent).toThrowError();
			});

			it('should throw an error when passing a product with a name equals to an empty string.', () => {
				invalidProductsArg[0].name = '';
				expect(spyOnSendProductImpressionsEvent).toThrowError();
			});

			it('should throw an error when passing a product with a position equals to a number less than 1.', () => {
				invalidProductsArg[0].position = 0;
				expect(spyOnSendProductImpressionsEvent).toThrowError();
			});
		});

		describe('"currencyCode" argument', () => {
			beforeEach(() => {
				service.sendProductImpressionsEvent(productsArg);
			});

			it('should be of type string', () => {
				expect(typeof currencyCodeArg).toBe('string');
			});

			it('should be optional with a default value of "USD"', () => {
				const currencyCodeValue =
					DataLayer.getLastElement()['ecommerce']['currencyCode'];
				expect(currencyCodeValue).toBe('USD');
			});

			it('should be one of the option on type CurrencyCode', () => {
				const isValidCurrencyCodeValue: boolean =
					listOfCurrencyCodeSupportedByUA.includes(currencyCodeArg);

				expect(isValidCurrencyCodeValue).toBe(true);
			});
		});
	});
});
