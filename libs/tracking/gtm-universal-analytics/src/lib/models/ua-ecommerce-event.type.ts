import {
	UaEcommerceProductImpressions,
	UaEcommerceProductClick,
	UaEcommerceViewProductDetails,
} from './gtm-ua-ecommerce-events.interface';

export type UaEcommerceEvents =
	| UaEcommerceProductImpressions
	| UaEcommerceProductClick
	| UaEcommerceViewProductDetails;
