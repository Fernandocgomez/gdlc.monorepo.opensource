import { inject, TestBed } from '@angular/core/testing';

import { GtmUniversalAnalyticsModule } from './gtm-universal-analytics.module';

import { GtmService } from './services/gtm.service';

describe('GtmUniversalAnalyticsModule', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				GtmUniversalAnalyticsModule.forRoot({
					id: 'test_id',
				}),
			],
		});
	});

	it('should inject a GoogleTagManagerConfig to the GtmService', inject(
		[GtmService],
		(gtmService: GtmService) => {
			expect(gtmService['config'].id).toBe('test_id');
		},
	));
});
