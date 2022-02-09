import { ModuleWithProviders, NgModule } from '@angular/core';

import { TrackingGoogleTagManagerConfig } from '@multi-step-funnels/tracking/tracking-models';

@NgModule()
export class TrackingAngularGoogleTagManagerModule {
	public static forRoot(
		config: TrackingGoogleTagManagerConfig,
	): ModuleWithProviders<TrackingAngularGoogleTagManagerModule> {
		return {
			ngModule: TrackingAngularGoogleTagManagerModule,
			providers: [
				{
					provide: 'TrackingGoogleTagManagerConfig',
					useValue: config,
				},
			],
		};
	}
}
