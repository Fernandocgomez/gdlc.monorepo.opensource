import { inject, TestBed } from '@angular/core/testing';

import { GoogleTagManagerModule } from './google-tag-manager.module';

import { TrackingGoogleTagManagerService } from './tracking-angular-google-tag-manager.service';

describe('TrackingGoogleTagManagerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				GoogleTagManagerModule.forRoot({
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
