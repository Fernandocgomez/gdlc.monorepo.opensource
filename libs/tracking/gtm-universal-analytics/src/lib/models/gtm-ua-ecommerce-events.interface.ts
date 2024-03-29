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

export interface UaEcommercePromotion {
	id: string;
	name: string;
	creative?: string;
	position?: string;
}

export interface UaEcommerceProductImpressions extends GtmUaCustomEvent {
	ecommerce: {
		currencyCode?: CurrencyCode;
		impressions: UaEcommerceProduct[];
	};
}

export interface UaEcommerceProductClick extends GtmUaCustomEvent {
	ecommerce: {
		click: {
			actionField?: { list?: string };
			products: UaEcommerceProduct[];
		};
	};
}

export interface UaEcommerceViewProductDetails extends GtmUaCustomEvent {
	ecommerce: {
		detail: {
			actionField?: { list?: string };
			products: UaEcommerceProduct[];
		};
	};
}

export interface UaEcommerceAddToCart extends GtmUaCustomEvent {
	ecommerce: {
		currencyCode: CurrencyCode;
		add: {
			products: UaEcommerceProduct[];
		};
	};
}

export interface UaEcommerceRemoveProductFromCart extends GtmUaCustomEvent {
	ecommerce: {
		remove: {
			products: UaEcommerceProduct[];
		};
	};
}

export interface UaEcommercePromotionImpressions extends GtmUaCustomEvent {
	ecommerce: {
		promoView: {
			promotions: UaEcommercePromotion[];
		};
	};
}
