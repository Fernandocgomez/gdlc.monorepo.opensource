import {
	UaEcommerceProductImpressions,
	UaEcommerceProductClick,
	UaEcommerceViewProductDetails,
	UaEcommerceAddToCart,
} from './gtm-ua-ecommerce-events.interface';

export type UaEcommerceEvents =
	| UaEcommerceProductImpressions
	| UaEcommerceProductClick
	| UaEcommerceViewProductDetails
	| UaEcommerceAddToCart;
