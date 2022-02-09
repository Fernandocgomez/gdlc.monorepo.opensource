import { inject, TestBed } from '@angular/core/testing';

import { TrackingAngularGoogleTagManagerModule } from './tracking-angular-google-tag-manager.module';

import { TrackingGoogleTagManagerService } from './tracking-angular-google-tag-manager.service';


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
