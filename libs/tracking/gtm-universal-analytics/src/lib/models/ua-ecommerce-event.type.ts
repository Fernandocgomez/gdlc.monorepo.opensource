import {
	UaEcommerceProductImpressions,
	UaEcommerceProductClick,
} from './gtm-ua-ecommerce-events.interface';

export type UaEcommerceEvent =
	| UaEcommerceProductImpressions
	| UaEcommerceProductClick;
