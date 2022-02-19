export interface UniversalAnalyticsEcommerceItem {
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

export interface UniversalAnalyticsEcommerceProductImpressionsEvent {
	ecommerce: {
		currencyCode?: string;
		impressions: UniversalAnalyticsEcommerceItem[];
	};
}

export interface UniversalAnalyticsEcommerceProductClickEvent {
	ecommerce: {
		click: {
			actionField?: {
				list?: string;
			};
			products?: UniversalAnalyticsEcommerceItem[];
		};
	};
}

export interface UniversalAnalyticsEcommerceViewProductDetailsEvent {
	ecommerce: {
		detail: {
			actionField?: {
				list?: string;
			};
			products?: UniversalAnalyticsEcommerceItem[];
		};
	};
}

export interface UniversalAnalyticsEcommerceAddToCartEvent {
	ecommerce: {
		currencyCode?: string;
		add: {
			products?: UniversalAnalyticsEcommerceItem[];
		};
	};
}

export interface UniversalAnalyticsEcommerceRemoveProductFromCartEvent {
	ecommerce: {
		remove: {
			products?: UniversalAnalyticsEcommerceItem[];
		};
	};
}

interface UniversalAnalyticsEcommercePromotion {
	id: string;
	name: string;
	creative?: string;
	position?: string;
}

export interface UniversalAnalyticsEcommercePromoViewEvent {
	ecommerce: {
		promoView: {
			promotions?: UniversalAnalyticsEcommercePromotion[];
		};
	};
}

export interface UniversalAnalyticsEcommercePromoClickEvent {
	ecommerce: {
		promoClick: {
			promotions?: UniversalAnalyticsEcommercePromotion[];
		};
	};
}

export interface UniversalAnalyticsEcommerceCheckoutStepEvent {
	ecommerce: {
		checkout: {
			actionField: {
				step: number;
				option?: string;
			};
			products?: UniversalAnalyticsEcommerceItem[];
		};
	};
}

export interface UniversalAnalyticsEcommerceCheckoutOptionEvent {
	ecommerce: {
		checkout_option: {
			actionField: {
				step: number;
				option: string;
			};
		};
	};
}

export interface UniversalAnalyticsEcommercePurchaseEvent {
	ecommerce: {
		purchase: {
			actionField: {
				id: string; // Transaction ID
				affiliation?: string;
				revenue?: string; // Total transaction value (incl. tax and shipping)
				tax?: string;
				shipping?: string;
				coupon?: string;
			};
			products?: UniversalAnalyticsEcommerceItem[];
		};
	};
}

interface UniversalAnalyticsEcommerceProductPartialRefund {
	id: string; // Product ID.
	quantity: number;
}

export interface UniversalAnalyticsEcommerceRefundEvent {
	ecommerce: {
		refund: {
			actionField: {
				id: string; // Transaction ID.
			};
			products?: UniversalAnalyticsEcommerceProductPartialRefund[];
		};
	};
}
