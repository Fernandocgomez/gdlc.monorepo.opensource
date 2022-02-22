import { Component } from '@angular/core';

import { GtmUaVirtualPageViewsService } from '@gdlc/gtm-universal-analytics';

@Component({
	selector: 'multi-step-funnels-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'library-tester';

	constructor(
		private gtmUaVirtualPageViewsService: GtmUaVirtualPageViewsService,
	) {
		this.gtmUaVirtualPageViewsService.sendVirtualPageViews();
	}
}
