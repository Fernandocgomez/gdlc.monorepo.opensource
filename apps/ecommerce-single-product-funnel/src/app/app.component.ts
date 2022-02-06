import { Component } from '@angular/core';

import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

@Component({
	selector: 'multi-step-funnels-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'ecommerce-single-product-funnel';

	constructor(private tr: TrackingGoogleTagManagerService) {
		this.tr.pushToDataLayer({ event: 'customEvent' });
	}
}
