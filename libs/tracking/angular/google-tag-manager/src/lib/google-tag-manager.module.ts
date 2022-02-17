import { ModuleWithProviders, NgModule } from '@angular/core';

import { GoogleTagManagerConfig } from '@multi-step-funnels/tracking/tracking-models';

@NgModule()
export class GoogleTagManagerModule {
	public static forRoot(
		config: GoogleTagManagerConfig,
	): ModuleWithProviders<GoogleTagManagerModule> {
		return {
			ngModule: GoogleTagManagerModule,
			providers: [
				{
					provide: 'GoogleTagManagerConfig',
					useValue: config,
				},
			],
		};
	}
}
