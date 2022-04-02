import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RouteOneComponent } from './components/route-one.component';
import { RouteTwoComponent } from './components/route-two.component';

import { GtmUniversalAnalyticsModule } from '@gdlc/gtm-universal-analytics';

@NgModule({
	declarations: [AppComponent, RouteOneComponent, RouteTwoComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: 'one',
					component: RouteOneComponent,
				},
				{
					path: 'two',
					component: RouteTwoComponent,
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
