import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingAngularGoogleTagManagerModule } from '@multi-step-funnels/tracking/angular/google-tag-manager';

@NgModule({
	imports: [CommonModule],
})
export class TrackingAngularUniversalAnalyticsModule extends TrackingAngularGoogleTagManagerModule {}
