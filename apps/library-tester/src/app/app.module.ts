import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { GtmUniversalAnalyticsModule } from '@gdlc/gtm-universal-analytics';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: '',
					component: AppComponent,
				},
				{
					path: 'tets',
					component: AppComponent,
				},
			],
			{ initialNavigation: 'enabledBlocking' },
		),
		GtmUniversalAnalyticsModule.forRoot({
			id: 'GTM-TH4Z92G',
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
