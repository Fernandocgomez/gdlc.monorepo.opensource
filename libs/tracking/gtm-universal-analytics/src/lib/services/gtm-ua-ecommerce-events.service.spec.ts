import { TestBed } from '@angular/core/testing';

import { GtmUaEcommerceEventsService } from './gtm-ua-ecommerce-events.service';

describe('GtmUaEcommerceEventsService', () => {
	let service: GtmUaEcommerceEventsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GtmUaEcommerceEventsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
