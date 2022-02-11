import { TestBed } from '@angular/core/testing';

import {
	GtmEvent,
	GtmUniversalAnalyticsCustomEvent,
} from '@multi-step-funnels/tracking/tracking-models';

import { UniversalAnalyticsCustomEventsService } from './universal-analytics-custom-events.service';

describe('UniversalAnalyticsCustomEventsService', () => {
	let service: UniversalAnalyticsCustomEventsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'TrackingGoogleTagManagerConfig',
					useValue: { id: 'test_id' },
				},
			],
		});
		service = TestBed.inject(UniversalAnalyticsCustomEventsService);
	});

	afterEach(() => {
		window.dataLayer = [];
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#triggerCustomEvent', () => {
		let gtmCustomEventPayload: GtmUniversalAnalyticsCustomEvent;
		let customEvent: GtmEvent | undefined;
		let dataLayer: GtmEvent[];

		beforeEach(() => {
			dataLayer = window.dataLayer;

			gtmCustomEventPayload = {
				event: 'customEvent',
				category: 'social media',
				action: 'click',
				label: 'facebook icon',
				value: 100,
			};

			service.triggerCustomEvent(gtmCustomEventPayload);

			customEvent = dataLayer.find((gtmObj) => {
				return gtmObj.event === 'customEvent';
			});
		});

		it('should push a customEvent to the dataLayer', () => {
			expect(customEvent?.event).toEqual('customEvent');
		});

		describe('argument gtmObj<GtmUniversalAnalyticsCustomEvent>', () => {
			it('should have label property as optional', () => {
				dataLayer = [];

				gtmCustomEventPayload = {
					event: 'customEvent',
					category: 'social media',
					action: 'click',
					value: 100,
				};

				service.triggerCustomEvent(gtmCustomEventPayload);

				customEvent = dataLayer.find((gtmObj) => {
					return gtmObj.event === 'customEvent';
				});

				expect(customEvent?.['label']).toBeUndefined();
			});

			it('should have value property as optional', () => {
				dataLayer = [];

				gtmCustomEventPayload = {
					event: 'customEvent',
					category: 'social media',
					action: 'click',
					label: 'facebook icon',
				};

				service.triggerCustomEvent(gtmCustomEventPayload);

				customEvent = dataLayer.find((gtmObj) => {
					return gtmObj.event === 'customEvent';
				});

				expect(customEvent?.['value']).toBeUndefined();
			});

			it('should have category property as required', () => {
				expect(customEvent?.['value']).not.toBeUndefined();
			});

			it('should have action property as required', () => {
				expect(customEvent?.['action']).not.toBeUndefined();
			});

			it('should have event property as required', () => {
				expect(customEvent?.['event']).not.toBeUndefined();
			});
		});
	});
});
