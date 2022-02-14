import { TestBed } from '@angular/core/testing';

import { TrackingGoogleTagManagerService } from './tracking-angular-google-tag-manager.service';

import { GtmEvent } from '@multi-step-funnels/tracking/tracking-models';

import {
	getDataLayer,
	getGtmScriptTagFromDom,
	destroyDataLayer,
	removeGtmScriptTagFromDom,
} from './utilities/helper-functions.utility';

describe('TrackingGoogleTagManagerService', () => {
	let service: TrackingGoogleTagManagerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'TrackingGoogleTagManagerConfig',
					useValue: { id: 'test_id' },
				},
			],
		});
		service = TestBed.inject(TrackingGoogleTagManagerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#init', () => {
		let spyOnThrowErrorWhenMissingId: jest.SpyInstance<any, unknown[]>;
		let spyOnCreateDataLayer: jest.SpyInstance<any, unknown[]>;
		let spyOnAddGtmToDomWhenTagDoNotExist: jest.SpyInstance<any, unknown[]>;

		beforeEach(() => {
			spyOnThrowErrorWhenMissingId = jest.spyOn(
				service as any,
				'throwErrorWhenMissingId',
			);
			spyOnCreateDataLayer = jest.spyOn(service as any, 'createDataLayer');
			spyOnAddGtmToDomWhenTagDoNotExist = jest.spyOn(
				service as any,
				'addGtmToDomWhenTagDoNotExist',
			);

			service['init']();
		});

		it('should call throwErrorWhenMissingId()', () => {
			expect(spyOnThrowErrorWhenMissingId).toBeCalledTimes(1);
		});

		it('should call createDataLayer()', () => {
			expect(spyOnCreateDataLayer).toBeCalledTimes(1);
		});

		it('should call addGtmToDomWhenTagDoNotExist()', () => {
			expect(spyOnAddGtmToDomWhenTagDoNotExist).toBeCalledTimes(1);
		});
	});

	describe('#throwErrorWhenMissingId', () => {
		it('should throw an error when the config id is a null value', () => {
			service['config'] = { id: null };

			const spyThrowErrorWhenMissingIdMethod = jest.spyOn(
				service as any,
				'throwErrorWhenMissingId',
			);

			expect(spyThrowErrorWhenMissingIdMethod).toThrowError();
		});

		it('should throw an error when the config id is an empty string value', () => {
			service['config'] = { id: '' };

			const spyThrowErrorWhenMissingIdMethod = jest.spyOn(
				service as any,
				'throwErrorWhenMissingId',
			);

			expect(spyThrowErrorWhenMissingIdMethod).toThrowError();
		});
	});

	describe('#createDataLayer', () => {
		it('should create dataLayer as an empty Array', () => {
			destroyDataLayer();

			service['createDataLayer']();

			expect(getDataLayer()).toStrictEqual([]);
		});
	});

	describe('#addGtmToDomWhenTagDoNotExist', () => {
		it('should create the GTM script tag on the DOM when it does not exist', () => {
			removeGtmScriptTagFromDom();

			service['addGtmToDomWhenTagDoNotExist']();

			const gtmScriptTag = getGtmScriptTagFromDom();

			expect(gtmScriptTag).toBeTruthy();
		});
	});

	describe('#gtmScriptTagExistOnDom', () => {
		it('should return false when the GTM script tag does not exist on the DOM', () => {
			removeGtmScriptTagFromDom();

			expect(service['gtmScriptTagExistOnDom']()).toBeFalsy();
		});

		it('should return true when the GTM script tag exist on the DOM', () => {
			expect(service['gtmScriptTagExistOnDom']()).toBeTruthy();
		});
	});

	describe('#addGtmToDom', () => {
		it('should append the GTM script tag to the head of the page', () => {
			removeGtmScriptTagFromDom();

			service['addGtmToDom']();

			expect(document.getElementById('GTMscript')).toBeTruthy();
		});
	});

	describe('#pushStartEventToDataLayer', () => {
		it('should push gtm.js start event', () => {
			destroyDataLayer();

			service['createDataLayer']();
			service['pushStartEventToDataLayer']();

			expect((getDataLayer()[0] as any).event).toEqual('gtm.js');
		});
	});

	describe('#createGtmScript', () => {
		let gtmScriptTag: HTMLScriptElement;

		beforeEach(() => {
			gtmScriptTag = service['createGtmScript']();
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

		it('should have a src attribute equals to "https://www.googletagmanager.com/gtm.js?id=test_id"', () => {
			expect(gtmScriptTag.getAttribute('src')).toEqual(
				'https://www.googletagmanager.com/gtm.js?id=test_id',
			);
		});
	});

	describe('#pushToDataLayer', () => {
		it('should push an object into the dataLayer', () => {
			destroyDataLayer();

			const gtmObject: GtmEvent = {
				event: 'page_view',
				url: 'https://www.google.com',
			};

			service['createDataLayer']();
			service['pushToDataLayer'](gtmObject);

			expect(getDataLayer()[0]).toEqual(gtmObject);
		});
	});

	describe('#clearEcommerceObject', () => {
		it('should clear the ecommerce object on the last dataLayer element', () => {
			destroyDataLayer();

			const gtmEcommerceEvent: GtmEvent = {
				event: 'removeFromCart',
				ecommerce: {
					remove: {
						products: [
							{
								name: 'Triblend Android T-Shirt',
								id: '12345',
								price: '15.25',
								brand: 'Google',
								category: 'Apparel',
								variant: 'Gray',
								quantity: 1,
							},
						],
					},
				},
			};

			service['createDataLayer']();
			service.pushToDataLayer(gtmEcommerceEvent);
			service.clearEcommerceObject();

			const dataLayer: GtmEvent[] = getDataLayer();
			const lastElementOnDataLayer: GtmEvent = dataLayer[dataLayer.length - 1];

			expect(lastElementOnDataLayer['ecommerce']).toBe(null);
		});
	});
});
