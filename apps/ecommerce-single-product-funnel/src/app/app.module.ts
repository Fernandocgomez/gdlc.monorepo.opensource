import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing.module';

import { TrackingAngularGoogleTagManagerModule } from '@multi-step-funnels/tracking/angular/google-tag-manager';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		TrackingAngularGoogleTagManagerModule.forRoot({
			id: 'GTM-TH4Z92G'
		})
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
