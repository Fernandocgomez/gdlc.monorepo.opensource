import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UniversalAnalyticsVirtualPageViewsService } from '@multi-step-funnels/tracking/angular/universal-analytics';


@Component({
	selector: 'multi-step-funnels-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(
		private universalAnalyticsVirtualPageViewsService: UniversalAnalyticsVirtualPageViewsService,
		private router: Router
	) {}

	navigate() {
		if(this.router.url.includes('test')) {
			this.router.navigate(['']);
		} else {
			this.router.navigate(['test']);
		}
	}
}
