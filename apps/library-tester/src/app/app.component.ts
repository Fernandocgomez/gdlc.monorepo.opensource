import { Component } from '@angular/core';

import {
	GtmUaVirtualPageViewsService,
	GtmUaCustomEventsService,
	GtmUaEcommerceEventsService,
} from '@gdlc/gtm-universal-analytics';

@Component({
	selector: 'multi-step-funnels-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	private ecommerceProducts = [
		{
			name: 'Triblend Android T-Shirt',
			id: '12345',
			price: '15.25',
			brand: 'Google',
			category: 'Apparel',
			variant: 'Gray',
			list: 'Search Results',
			position: 1,
		},
		{
			name: 'Donut Friday Scented T-Shirt',
			id: '67890',
			price: '33.75',
			brand: 'Google',
			category: 'Apparel',
			variant: 'Black',
			list: 'Search Results',
			position: 2,
		},
	];

	private searchList = 'T-Shirts List';

	constructor(
		private gtmUaVirtualPageViewsService: GtmUaVirtualPageViewsService,
		private gtmUaCustomEventsService: GtmUaCustomEventsService,
		private gtmUaEcommerceEventsService: GtmUaEcommerceEventsService,
	) {
		this.gtmUaVirtualPageViewsService.sendVirtualPageViews();
	}

	testSendCustomEvent(): void {
		const gtmCustomEvent = {
			category: 'social media',
			action: 'click',
			label: 'facebook icon',
			value: 100,
			nonInteraction: false,
		};

		this.gtmUaCustomEventsService.sendCustomEvent(gtmCustomEvent);
	}

	testProductImpressionsEvent(): void {
		const currencyCode = 'EUR';

		this.gtmUaEcommerceEventsService.sendProductImpressionsEvent(
			this.ecommerceProducts,
			currencyCode,
		);
	}

	testSendProductClickEvent(): void {
		this.gtmUaEcommerceEventsService.sendProductClickEvent(
			this.ecommerceProducts,
			this.searchList,
		);
	}

	testSendViewProductDetailsEvent(): void {
		this.gtmUaEcommerceEventsService.sendViewProductDetailsEvent(
			this.ecommerceProducts,
			this.searchList,
		);
	}

	testSendAddToCartEvent(): void {
		const currencyCode = 'EUR';

		this.gtmUaEcommerceEventsService.sendAddToCartEvent(
			[this.ecommerceProducts[0]],
			currencyCode,
		);
	}
}
