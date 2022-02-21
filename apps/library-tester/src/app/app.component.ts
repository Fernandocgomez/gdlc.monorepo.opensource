import { Component } from '@angular/core';

import { GtmService } from '@gdlc/gtm-universal-analytics';

@Component({
	selector: 'multi-step-funnels-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'library-tester';

	constructor(private gtmService: GtmService) {}
}
