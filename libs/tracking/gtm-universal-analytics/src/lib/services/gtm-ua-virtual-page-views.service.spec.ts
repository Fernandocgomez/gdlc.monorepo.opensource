import { TestBed } from '@angular/core/testing';

import { GtmUaVirtualPageViewsService } from './gtm-ua-virtual-page-views.service';

describe('GtmUaVirtualPageViewsService', () => {
	let service: GtmUaVirtualPageViewsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GtmUaVirtualPageViewsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
