import { inject, TestBed } from '@angular/core/testing';

import { GoogleTagManagerModule } from './google-tag-manager.module';

import { GoogleTagManagerService } from './google-tag-manager.service';

describe('GoogleTagManagerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				GoogleTagManagerModule.forRoot({
					id: 'test_id',
				}),
			],
		});
	});

	it('should create a GoogleTagManagerService', inject(
		[GoogleTagManagerService],
		(service: GoogleTagManagerService) => {
			expect(service).toBeTruthy();
		},
	));
});
