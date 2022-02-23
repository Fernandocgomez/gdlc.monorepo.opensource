import { Component } from '@angular/core';

import {
	GtmUaVirtualPageViewsService,
	GtmUaCustomEventsService,
} from '@gdlc/gtm-universal-analytics';

@Component({
	selector: 'multi-step-funnels-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'library-tester';

	constructor(
		private gtmUaVirtualPageViewsService: GtmUaVirtualPageViewsService,
		private gtmUaCustomEventsService: GtmUaCustomEventsService,
	) {
		this.gtmUaVirtualPageViewsService.sendVirtualPageViews();
	}

	public redirectToFacebookPage(): void {
		const gtmCustomEvent = {
			category: 'social media',
			action: 'click',
			label: 'facebook icon',
			value: 100,
			nonInteraction: false,
		};

		this.gtmUaCustomEventsService.sendCustomEvent(gtmCustomEvent);

		location.href = '#';
	}
}
