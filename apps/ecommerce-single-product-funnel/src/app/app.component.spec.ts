import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { TrackingAngularGoogleTagManagerModule } from '@multi-step-funnels/tracking/angular/google-tag-manager';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				TrackingAngularGoogleTagManagerModule.forRoot({
					id: 'test_id',
				}),
				RouterTestingModule,
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
