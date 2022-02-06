import { ModuleWithProviders, NgModule } from '@angular/core';

import { TrackingGoogleTagManagerConfig } from './tracking-google-tag-manger-config.model';

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
