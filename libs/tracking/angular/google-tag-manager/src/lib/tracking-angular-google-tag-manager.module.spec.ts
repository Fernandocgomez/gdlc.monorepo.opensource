import { inject, TestBed } from '@angular/core/testing';

import {
	TrackingAngularGoogleTagManagerModule,
	TrackingGoogleTagManagerService,
} from '@multi-step-funnels/tracking/angular/google-tag-manager';

describe('TrackingGoogleTagManagerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				TrackingAngularGoogleTagManagerModule.forRoot({
					id: 'test_id',
				}),
			],
		});
	});

	it('should create a TrackingGoogleTagManagerService', inject(
		[TrackingGoogleTagManagerService],
		(service: TrackingGoogleTagManagerService) => {
			expect(service).toBeTruthy();
		},
	));
});
