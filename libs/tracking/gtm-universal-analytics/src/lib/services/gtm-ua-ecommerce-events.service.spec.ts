import { TestBed } from '@angular/core/testing';

import {
	CurrencyCode,
	listOfCurrencyCodeSupportedByUA,
	UaEcommerceProduct,
	UaEcommercePromotion,
} from '../models';

import { GtmUaEcommerceEventsService } from './gtm-ua-ecommerce-events.service';

import {
	uaEcommerceProductsMockUp,
	DataLayer,
	uaEcommercePromotionsMockUp,
} from '../utilities';

describe('GtmUaEcommerceEventsService', () => {
	let service: GtmUaEcommerceEventsService;

	const productsArg = uaEcommerceProductsMockUp;
	const currencyCodeArg: CurrencyCode = 'EUR';
	const searchListArg = 'Search List';
	const promotionsArg = uaEcommercePromotionsMockUp;

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

	type GtmUaEcommerceEventServiceProductMethod =
		| 'sendProductImpressionsEvent'
		| 'sendProductClickEvent'
		| 'sendViewProductDetailsEvent'
		| 'sendAddToCartEvent'
		| 'sendRemoveProductFromCartEvent';

	type GtmUaEcommerceEventServicePromotionMethod =
		| 'sendPromotionImpressionsEvent';

	const makeADeepCopyOfTheFirstElementOnArray = (
		array: UaEcommerceProduct[],
	): UaEcommerceProduct[] => {
		if (array.length > 0) {
			return [...[{ ...array[0] }]];
		}

		return [] as UaEcommerceProduct[];
	};

	const assertProductsArgument = (
		method: GtmUaEcommerceEventServiceProductMethod,
		...moreProductTests: (() => void)[]
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

		if (moreProductTests.length > 0) {
			for (const productTest of moreProductTests) {
				productTest();
			}
		}
	};

	const assertPromotionsArgument = (
		method: GtmUaEcommerceEventServicePromotionMethod,
		...moreProductTests: (() => void)[]
	) => {
		let invalidPromotionsArg: UaEcommercePromotion[];

		describe('"promotions" argument', () => {
			beforeEach(() => {
				invalidPromotionsArg = promotionsArg.map((object) => ({ ...object }));
			});

			it('should be an Array', () => {
				expect(Array.isArray(productsArg)).toBe(true);
			});

			it('should throw an error when passing a product with an "id" equals to an empty string.', () => {
				invalidPromotionsArg[0].id = '';

				try {
					service[method](invalidPromotionsArg);
					expect(service[method](invalidPromotionsArg)).toThrow(Error);
				} catch (error: any) {
					expect(error.message).toBe(
						'UaEcommercePromotion at index: 0 has an invalid value. Id can not be an empty string.',
					);
				}
			});

			it('should throw an error when passing a product with a "name" equals to an empty string.', () => {
				invalidPromotionsArg[0].name = '';

				try {
					service[method](invalidPromotionsArg);
					expect(service[method](invalidPromotionsArg)).toThrow(Error);
				} catch (error: any) {
					expect(error.message).toBe(
						'UaEcommercePromotion at index: 0 has an invalid value. Name can not be an empty string.',
					);
				}
			});
		});

		describe('when passing an empty Array', () => {
			it('should throw an Error', () => {
				try {
					service[method]([]);
					expect(service[method]([])).toThrow(Error);
				} catch (error: any) {
					expect(error.message).toBe(
						'UaEcommercePromotion can not be an empty Array.',
					);
				}
			});
		});

		if (moreProductTests.length > 0) {
			for (const productTest of moreProductTests) {
				productTest();
			}
		}
	};

	const assertCurrencyCodeArgument = (
		method: GtmUaEcommerceEventServiceProductMethod,
	) => {
		describe('"currencyCode" argument', () => {
			beforeEach(() => {
				service[method](productsArg);
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
	};

	const assertEventProperty = () => {
		it('should have the property "event" equal to "angularEcommerce"', () => {
			expect(DataLayer.getLastElement().event).toBe('angularEcommerce');
		});
	};

	const assertCurrencyCodeProperty = () => {
		it('should have the property "currencyCode" equal to "EUR"', () => {
			const currencyCodeValue =
				DataLayer.getLastElement()['ecommerce']['currencyCode'];
			expect(currencyCodeValue).toBe('EUR');
		});
	};

	const assertEcommerceProperty = (ecommerceObject: object) => {
		it('should have the property "ecommerce" equal to "ecommerceObject"', () => {
			expect(DataLayer.getLastElement()['ecommerce']).toStrictEqual(
				ecommerceObject,
			);
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

	const assertProductsArrayForEmptyValues = (
		method: GtmUaEcommerceEventServiceProductMethod,
	) => {
		describe('"products" argument', () => {
			it('should throw an Error when passing an empty Array', () => {
				try {
					service[method]([]);
					expect(service[method]([])).toThrow(Error);
				} catch (error: any) {
					expect(error.message).toBe(
						'UaEcommerceProduct can not be an empty Array.',
					);
				}
			});
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

			assertEcommerceProperty({
				currencyCode: currencyCodeArg,
				impressions: productsArg,
			});

			assertCurrencyCodeProperty();

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

		assertCurrencyCodeArgument('sendProductImpressionsEvent');
	});

	describe('#sendProductClickEvent', () => {
		describe('pushed object to dataLayer', () => {
			beforeEach(() => {
				service.sendProductClickEvent(productsArg, searchListArg);
			});

			assertEventProperty();

			assertEcommerceProperty({
				click: {
					actionField: { list: searchListArg },
					products: productsArg,
				},
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

	describe('#sendViewProductDetailsEvent', () => {
		describe('pushed object to dataLayer', () => {
			beforeEach(() => {
				service.sendViewProductDetailsEvent(productsArg, searchListArg);
			});

			assertEventProperty();

			assertEcommerceProperty({
				detail: {
					actionField: { list: searchListArg },
					products: productsArg,
				},
			});

			it('should have the property "detail" equal to "detailObject"', () => {
				const detailObject = {
					actionField: { list: searchListArg },
					products: productsArg,
				};

				expect(DataLayer.getLastElement()['ecommerce']['detail']).toStrictEqual(
					detailObject,
				);
			});

			it('should have the property "actionField" equal to "actionFieldObject"', () => {
				const actionFieldObject = {
					list: searchListArg,
				};

				expect(
					DataLayer.getLastElement()['ecommerce']['detail']['actionField'],
				).toStrictEqual(actionFieldObject);
			});

			it('should have the property "list" equal to "searchListArg"', () => {
				expect(
					DataLayer.getLastElement()['ecommerce']['detail']['actionField'][
						'list'
					],
				).toStrictEqual(searchListArg);
			});

			it('should have the property "products" equal to "productsArg"', () => {
				expect(
					DataLayer.getLastElement()['ecommerce']['detail']['products'],
				).toStrictEqual(productsArg);
			});

			assertCategoryProperty();

			assertActionProperty('view');

			assertLabelProperty('view product details');

			assertNonInteractionProperty(false);
		});

		assertProductsArgument('sendViewProductDetailsEvent');

		describe('"searchList" argument', () => {
			beforeEach(() => {
				service.sendViewProductDetailsEvent(productsArg);
			});

			it('should be of type string', () => {
				expect(typeof searchListArg).toBe('string');
			});

			describe('when not passing "searchList" argument', () => {
				it('should not have the "actionField" property', () => {
					expect(
						DataLayer.getLastElement()['ecommerce']['detail']['actionField'],
					).toBe(undefined);
				});
			});
		});
	});

	describe('#sendAddToCartEvent', () => {
		describe('pushed object to dataLayer', () => {
			const addToCartProductArg =
				makeADeepCopyOfTheFirstElementOnArray(productsArg);

			beforeEach(() => {
				service.sendAddToCartEvent(addToCartProductArg, currencyCodeArg);
			});

			assertEventProperty();

			assertEcommerceProperty({
				currencyCode: currencyCodeArg,
				add: {
					products: addToCartProductArg,
				},
			});

			assertCurrencyCodeProperty();

			it('should have the property "add" pointing to a "products" object', () => {
				const addObject = DataLayer.getLastElement()['ecommerce']['add'];
				expect(addObject).toStrictEqual({
					products: addToCartProductArg,
				});
			});

			assertCategoryProperty();

			assertActionProperty('add to cart');

			assertLabelProperty(`${addToCartProductArg[0].name} - added to cart`);

			assertNonInteractionProperty(true);
		});

		assertProductsArgument('sendAddToCartEvent', () => {
			assertProductsArrayForEmptyValues('sendAddToCartEvent');
		});

		assertCurrencyCodeArgument('sendAddToCartEvent');
	});

	describe('#sendRemoveProductFromCartEvent', () => {
		describe('pushed object to dataLayer', () => {
			const removeFromCartProductArg =
				makeADeepCopyOfTheFirstElementOnArray(productsArg);

			beforeEach(() => {
				service.sendRemoveProductFromCartEvent(removeFromCartProductArg);
			});

			assertEventProperty();

			assertEcommerceProperty({
				remove: {
					products: removeFromCartProductArg,
				},
			});

			it('should have the property "remove" pointing to a "products" object', () => {
				const addObject = DataLayer.getLastElement()['ecommerce']['remove'];
				expect(addObject).toStrictEqual({
					products: removeFromCartProductArg,
				});
			});

			assertCategoryProperty();

			assertActionProperty('remove product from cart');

			assertLabelProperty(
				`${removeFromCartProductArg[0].name} - removed from cart`,
			);

			assertNonInteractionProperty(true);
		});

		assertProductsArgument('sendRemoveProductFromCartEvent', () => {
			assertProductsArrayForEmptyValues('sendRemoveProductFromCartEvent');
		});
	});

	describe('#sendPromotionImpressionsEvent', () => {
		describe('pushed object to dataLayer', () => {
			beforeEach(() => {
				service.sendPromotionImpressionsEvent(promotionsArg);
			});

			assertEventProperty();

			assertEcommerceProperty({
				promoView: {
					promotions: promotionsArg,
				},
			});

			it('should have the property "promoView" pointing to a "promotions" object', () => {
				const promoViewObject =
					DataLayer.getLastElement()['ecommerce']['promoView'];

				expect(promoViewObject).toStrictEqual({
					promotions: promotionsArg,
				});
			});

			assertCategoryProperty();

			assertActionProperty('impression');

			assertLabelProperty(`promotion impression`);

			assertNonInteractionProperty(false);
		});

		assertPromotionsArgument('sendPromotionImpressionsEvent');
	});
});
