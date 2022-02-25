import { CurrencyCode } from './currency-code.type';

import { GtmUaCustomEvent } from './gtm-ua-custom-event.interface';

export interface UaEcommerceProduct {
	name: string;
	id: string;
	price?: string;
	brand?: string;
	category?: string;
	variant?: string;
	list?: string;
	position?: number;
	quantity?: number;
	coupon?: string;
}

export interface UaEcommerceProductImpressions extends GtmUaCustomEvent {
	ecommerce: {
		currencyCode?: CurrencyCode;
		impressions: UaEcommerceProduct[];
	};
}
