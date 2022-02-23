import { TestBed } from '@angular/core/testing';

import { GtmUaCustomEventsService } from './gtm-ua-custom-events.service';
import { GtmService } from './gtm.service';

import { GtmEvent, GtmUaCustomEvent } from '../models';

describe('GtmUaCustomEventsService', () => {
	type SpyInstance = jest.SpyInstance<any, unknown[]>;

	let service: GtmUaCustomEventsService;
	let gtmService: GtmService;

	let spyOnTransformToGtmEvent: SpyInstance;
	let spyOnPushToDataLayer: SpyInstance;

	const customEvent: GtmUaCustomEvent = {
		category: 'social media',
		action: 'click',
	};

	const getDataLayer = (): GtmEvent[] => {
		return window.dataLayer;
	};

	const getLastElementOnDataLayer = (): GtmEvent => {
		const dataLayer = getDataLayer();
		return dataLayer[dataLayer.length - 1];
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'GtmConfig',
					useValue: { id: 'test_id' },
				},
			],
		});

		gtmService = TestBed.inject(GtmService);
		service = TestBed.inject(GtmUaCustomEventsService);

		spyOnTransformToGtmEvent = jest.spyOn(
			service as any,
			'transformToGtmEvent',
		);

		spyOnPushToDataLayer = jest.spyOn(gtmService as any, 'pushToDataLayer');
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#sendCustomEvent', () => {
		beforeEach(() => {
			service.sendCustomEvent(customEvent);
		});

		it('should push an object with the property event equal to "angularCustomEvent"', () => {
			expect(getLastElementOnDataLayer().event).toBe('angularCustomEvent');
		});

		it('should invoke #transformToGtmEvent once', () => {
			expect(spyOnTransformToGtmEvent).toBeCalledTimes(1);
		});

		it('should invoke #pushToDataLayer from the GtmService', () => {
			expect(spyOnPushToDataLayer).toBeCalledTimes(1);
		});
	});

	describe('#transformToGtmEvent', () => {
		it('should return a GtmEvent object with the event property equals to "angularCustomEvent"', () => {
			const transformToGtmEventReturnValue =
				service['transformToGtmEvent'](customEvent);

			expect(transformToGtmEventReturnValue.event).toBe('angularCustomEvent');
		});
	});
});
