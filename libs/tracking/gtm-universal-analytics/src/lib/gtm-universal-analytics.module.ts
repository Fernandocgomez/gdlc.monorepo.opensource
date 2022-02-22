import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GtmConfig } from './models';

@NgModule({
	imports: [CommonModule],
})
export class GtmUniversalAnalyticsModule {
	public static forRoot(
		config: GtmConfig,
	): ModuleWithProviders<GtmUniversalAnalyticsModule> {
		return {
			ngModule: GtmUniversalAnalyticsModule,
			providers: [
				{
					provide: 'GtmConfig',
					useValue: config,
				},
			],
		};
	}
}
