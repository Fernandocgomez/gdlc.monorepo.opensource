import {
	UaEcommerceProductImpressions,
	UaEcommerceProductClick,
	UaEcommerceViewProductDetails,
	UaEcommerceAddToCart,
	UaEcommerceRemoveProductFromCart,
	UaEcommercePromotionImpressions,
} from './gtm-ua-ecommerce-events.interface';

export type UaEcommerceEvents =
	| UaEcommerceProductImpressions
	| UaEcommerceProductClick
	| UaEcommerceViewProductDetails
	| UaEcommerceAddToCart
	| UaEcommerceRemoveProductFromCart
	| UaEcommercePromotionImpressions;
