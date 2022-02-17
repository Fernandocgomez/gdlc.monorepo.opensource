import { ModuleWithProviders, NgModule } from '@angular/core';

import { TrackingGoogleTagManagerConfig } from '@multi-step-funnels/tracking/tracking-models';

@NgModule()
export class GoogleTagManagerModule {
	public static forRoot(
		config: TrackingGoogleTagManagerConfig,
	): ModuleWithProviders<GoogleTagManagerModule> {
		return {
			ngModule: GoogleTagManagerModule,
			providers: [
				{
					provide: 'TrackingGoogleTagManagerConfig',
					useValue: config,
				},
			],
		};
	}
}
