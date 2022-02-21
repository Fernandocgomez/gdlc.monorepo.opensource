import { TestBed } from '@angular/core/testing';

import { GtmUaCustomEventsService } from './gtm-ua-custom-events.service';

describe('GtmUaCustomEventsService', () => {
	let service: GtmUaCustomEventsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GtmUaCustomEventsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
