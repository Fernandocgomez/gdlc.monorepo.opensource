import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { TrackingAngularGoogleTagManagerModule } from '@multi-step-funnels/tracking/angular/google-tag-manager';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		TrackingAngularGoogleTagManagerModule.forRoot({
			id: 'GTM-TH4Z92G',
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
