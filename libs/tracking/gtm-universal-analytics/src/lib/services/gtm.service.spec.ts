import { TestBed } from '@angular/core/testing';

import { GtmService } from './gtm.service';

import { GtmEvent } from '../models';

import { DataLayer, uaEcommerceProductsMockUp } from '../utilities';

describe('GtmService', () => {
	let service: GtmService;
	let spyOnThrowErrorWhenPassingInvalidGtmId: SpyInstance;
	let spyOnCreateDataLayer: SpyInstance;
	let spyOnPushStartEventToDataLayer: SpyInstance;
	let spyOnAddGtmScriptToDom: SpyInstance;
	let gtmScriptTag: HTMLScriptElement;

	const gtmId = 'test_id';

	const gtmEventMockUp: GtmEvent = {
		event: 'test',
	};

	const gtmEcommerceEvent: GtmEvent = {
		event: 'removeFromCart',
		ecommerce: {
			remove: {
				products: uaEcommerceProductsMockUp,
			},
		},
	};

	const spyOn = (method: string) => {
		return jest.spyOn(service as any, method);
	};

	const assignInvalidGtmId = () => {
		service['config'].id = '';
	};

	const getGtmScriptTagFromDom = (): HTMLElement | null => {
		return document.getElementById('GTMscript');
	};

	const removeGtmScriptTagFromDom = (): void => {
		if (service['gtmScriptTagExistOnDom']()) {
			getGtmScriptTagFromDom()?.remove();
		}
	};

	type SpyInstance = jest.SpyInstance<any, unknown[]>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'GtmConfig',
					useValue: { id: gtmId },
				},
			],
		});
		service = TestBed.inject(GtmService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have a valid GTM ID', () => {
		expect(service['config'].id).toBeTruthy();
	});

	it('should create a GTM script tag', () => {
		expect(getGtmScriptTagFromDom()).toBeTruthy();
	});

	describe('#initDataLayer', () => {
		beforeEach(() => {
			spyOnThrowErrorWhenPassingInvalidGtmId = spyOn(
				'throwErrorWhenPassingInvalidGtmId',
			);
			spyOnCreateDataLayer = spyOn('createDataLayer');
			spyOnPushStartEventToDataLayer = spyOn('pushStartEventToDataLayer');
			spyOnAddGtmScriptToDom = spyOn('addGtmScriptToDom');

			service['initDataLayer']();
		});

		it('should invoke #throwErrorWhenPassingInvalidGtmId', () => {
			expect(spyOnThrowErrorWhenPassingInvalidGtmId).toHaveBeenCalled();
		});

		it('should invoke #createDataLayer', () => {
			expect(spyOnCreateDataLayer).toHaveBeenCalled();
		});

		it('should invoke #pushStartEventToDataLayer', () => {
			expect(spyOnPushStartEventToDataLayer).toHaveBeenCalled();
		});

		it('should invoke #addGtmScriptToDom', () => {
			expect(spyOnAddGtmScriptToDom).toHaveBeenCalled();
		});
	});

	describe('#throwErrorWhenPassingInvalidGtmId', () => {
		it('should throw an error with the message "GTM Id not provided."', () => {
			assignInvalidGtmId();
			try {
				service['throwErrorWhenPassingInvalidGtmId']();
			} catch (error: any) {
				expect(error.message).toBe('GTM Id not provided.');
			}
		});
	});

	describe('#createDataLayer', () => {
		it('should create the dataLayer', () => {
			DataLayer.setToUndefined();

			expect(DataLayer.getDataLayer()).toBe(undefined);

			service['createDataLayer']();

			expect(DataLayer.getDataLayer()).toStrictEqual(new Array<GtmEvent>());
		});
	});

	describe('#pushStartEventToDataLayer', () => {
		it('should push an object with the property event equal to "gtm.js"', () => {
			DataLayer.setToEmptyArray();
			service['pushStartEventToDataLayer']();

			expect(DataLayer.getLastElement().event).toBe('gtm.js');
		});
	});

	describe('#addGtmScriptToDom', () => {
		it('should append a GTM script tag to the DOM head', () => {
			removeGtmScriptTagFromDom();

			service['addGtmScriptToDom']();

			expect(getGtmScriptTagFromDom()).toBeTruthy();
		});
	});

	describe('#createGtmScriptTag', () => {
		it('should return true when GTM script tag exist on DOM head', () => {
			expect(service['gtmScriptTagExistOnDom']()).toBe(true);
		});

		it('should return false when GTM script tag does not exist on DOM head', () => {
			removeGtmScriptTagFromDom();
			expect(service['gtmScriptTagExistOnDom']()).toBe(false);
		});
	});

	describe('#createGtmScriptTag', () => {
		beforeEach(() => {
			gtmScriptTag = service['createGtmScriptTag']();
		});

		it('should create the GTM script tag', () => {
			expect(gtmScriptTag).toBeTruthy();
		});

		it('should have an id equals to "GTMscript"', () => {
			expect(gtmScriptTag.getAttribute('id')).toBe('GTMscript');
		});

		it('should have an async attribute equals to "true"', () => {
			expect(gtmScriptTag.async).toEqual(true);
		});

		it(`should have a src attribute equals to "https://www.googletagmanager.com/gtm.js?id=${gtmId}"`, () => {
			expect(gtmScriptTag.getAttribute('src')).toEqual(
				`https://www.googletagmanager.com/gtm.js?id=${gtmId}`,
			);
		});
	});

	describe('#pushToDataLayer', () => {
		it('should push object to dataLayer', () => {
			service.pushToDataLayer(gtmEventMockUp);

			expect(DataLayer.getLastElement().event).toBe(gtmEventMockUp.event);
		});
	});

	describe('#clearEcommerceObject', () => {
		it('should clear the ecommerce object on the last dataLayer element', () => {
			DataLayer.setToEmptyArray();
			service.pushToDataLayer(gtmEcommerceEvent);
			service.clearEcommerceObject();

			expect(DataLayer.getLastElement()['ecommerce']).toBe(null);
		});
	});
});
