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

	const productsArg = uaEcommerceProductsMockUp;
	const currencyCodeArg: CurrencyCode = 'EUR';
	const searchListArg = 'Search List';

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

	type GtmUaEcommerceEventsServiceMethods =
		| 'sendProductImpressionsEvent'
		| 'sendProductClickEvent';

	const assertProductsArgument = (
		method: GtmUaEcommerceEventsServiceMethods,
	) => {
		let invalidProductsArg: UaEcommerceProduct[];

		describe('"products" argument', () => {
			beforeEach(() => {
				invalidProductsArg = productsArg.map((object) => ({ ...object }));
			});

			it('should be an Array', () => {
				expect(Array.isArray(productsArg)).toBe(true);
			});

			it('should throw an error when passing a product with an "id" equals to an empty string.', () => {
				invalidProductsArg[0].id = '';

				try {
					service[method](invalidProductsArg);
					expect(service[method](invalidProductsArg)).toThrow(Error);
				} catch (error: any) {
					expect(error.message).toBe(
						'UaEcommerceProduct at index: 0 has an invalid value. Id can not be an empty string.',
					);
				}
			});

			it('should throw an error when passing a product with a "name" equals to an empty string.', () => {
				invalidProductsArg[0].name = '';

				try {
					service[method](invalidProductsArg);
					expect(service[method](invalidProductsArg)).toThrow(Error);
				} catch (error: any) {
					expect(error.message).toBe(
						'UaEcommerceProduct at index: 0 has an invalid value. Name can not be an empty string.',
					);
				}
			});

			it('should throw an error when passing a product with a "position" equals to a number less than 1.', () => {
				invalidProductsArg[0].position = 0;

				try {
					service[method](invalidProductsArg);
					expect(service[method](invalidProductsArg)).toThrow(Error);
				} catch (error: any) {
					expect(error.message).toBe(
						'UaEcommerceProduct at index: 0 has an invalid value. Position can not be a number less than 1.',
					);
				}
			});
		});
	};

	const assertEventProperty = () => {
		it('should have the property "event" equal to "angularEcommerce"', () => {
			expect(DataLayer.getLastElement().event).toBe('angularEcommerce');
		});
	};

	const assertCategoryProperty = () => {
		it('should have the property "category" equal to "ecommerce"', () => {
			expect(DataLayer.getLastElement()['category']).toBe('ecommerce');
		});
	};

	const assertActionProperty = (expectValue: string) => {
		it(`should have the property "action" equal to "${expectValue}"`, () => {
			expect(DataLayer.getLastElement()['action']).toBe(expectValue);
		});
	};

	const assertLabelProperty = (expectValue: string) => {
		it(`should have the property "label" equal to "${expectValue}"`, () => {
			expect(DataLayer.getLastElement()['label']).toBe(expectValue);
		});
	};

	const assertNonInteractionProperty = (expectValue: boolean) => {
		it(`should have the property "nonInteraction" equal to "${expectValue}"`, () => {
			expect(DataLayer.getLastElement()['nonInteraction']).toBe(expectValue);
		});
	};

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#sendProductImpressionsEvent', () => {
		describe('pushed object to dataLayer', () => {
			beforeEach(() => {
				service.sendProductImpressionsEvent(productsArg, currencyCodeArg);
			});

			assertEventProperty();

			it('should have the property "ecommerce" equal to "ecommerceObject"', () => {
				const ecommerceObject = {
					currencyCode: currencyCodeArg,
					impressions: productsArg,
				};

				expect(DataLayer.getLastElement()['ecommerce']).toStrictEqual(
					ecommerceObject,
				);
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

			assertCategoryProperty();

			assertActionProperty('impressions');

			assertLabelProperty('product impressions');

			assertNonInteractionProperty(false);
		});

		assertProductsArgument('sendProductImpressionsEvent');

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

	describe('#sendProductClickEvent', () => {
		describe('pushed object to dataLayer', () => {
			beforeEach(() => {
				service.sendProductClickEvent(productsArg, searchListArg);
			});

			assertEventProperty();

			it('should have the property "ecommerce" equal to "ecommerceObject"', () => {
				const ecommerceObject = {
					click: {
						actionField: { list: searchListArg },
						products: productsArg,
					},
				};

				expect(DataLayer.getLastElement()['ecommerce']).toStrictEqual(
					ecommerceObject,
				);
			});

			it('should have the property "click" equal to "clickObject"', () => {
				const clickObject = {
					actionField: { list: searchListArg },
					products: productsArg,
				};

				expect(DataLayer.getLastElement()['ecommerce']['click']).toStrictEqual(
					clickObject,
				);
			});

			it('should have the property "actionField" equal to "actionFieldObject"', () => {
				const actionFieldObject = {
					list: searchListArg,
				};

				expect(
					DataLayer.getLastElement()['ecommerce']['click']['actionField'],
				).toStrictEqual(actionFieldObject);
			});

			it('should have the property "list" equal to "searchListArg"', () => {
				expect(
					DataLayer.getLastElement()['ecommerce']['click']['actionField'][
						'list'
					],
				).toStrictEqual(searchListArg);
			});

			it('should have the property "products" equal to "productsArg"', () => {
				expect(
					DataLayer.getLastElement()['ecommerce']['click']['products'],
				).toStrictEqual(productsArg);
			});

			assertCategoryProperty();

			assertActionProperty('click');

			assertLabelProperty('product click');

			assertNonInteractionProperty(true);
		});

		assertProductsArgument('sendProductClickEvent');

		describe('"searchList" argument', () => {
			beforeEach(() => {
				service.sendProductClickEvent(productsArg);
			});

			it('should be of type string', () => {
				expect(typeof searchListArg).toBe('string');
			});

			describe('when not passing "searchList" argument', () => {
				it('should not have the "actionField" property', () => {
					expect(
						DataLayer.getLastElement()['ecommerce']['click']['actionField'],
					).toBe(undefined);
				});
			});
		});
	});
});
