import {
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceItem,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommercePromoClickEvent,
	UniversalAnalyticsEcommercePromotion,
	UniversalAnalyticsEcommercePromoViewEvent,
	UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

export const ecommerceProductsMock: UniversalAnalyticsEcommerceItem[] = [
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

export const ecommercePromotionsMock: UniversalAnalyticsEcommercePromotion[] = [
	{
		id: 'JUNE_PROMO13',
		name: 'June Sale',
		creative: 'banner1',
		position: 'slot1',
	},
	{
		id: 'FREE_SHIP13',
		name: 'Free Shipping Promo',
		creative: 'skyscraper1',
		position: 'slot2',
	},
];

export const productImpressionEventMock: UniversalAnalyticsEcommerceProductImpressionsEvent =
	{
		ecommerce: {
			currencyCode: 'EUR',
			impressions: ecommerceProductsMock,
		},
	};

export const productClickEventMock: UniversalAnalyticsEcommerceProductClickEvent =
	{
		ecommerce: {
			click: {
				actionField: { list: 'Search Results' },
				products: ecommerceProductsMock,
			},
		},
	};

export const viewProductDetailsEventMock: UniversalAnalyticsEcommerceViewProductDetailsEvent =
	{
		ecommerce: {
			detail: {
				actionField: { list: 'Apparel Gallery' },
				products: ecommerceProductsMock,
			},
		},
	};

export const addToCartEventMock: UniversalAnalyticsEcommerceAddToCartEvent = {
	ecommerce: {
		currencyCode: 'EUR',
		add: {
			products: ecommerceProductsMock,
		},
	},
};

export const removeFromCartEventMock: UniversalAnalyticsEcommerceRemoveProductFromCartEvent =
	{
		ecommerce: {
			remove: {
				products: ecommerceProductsMock,
			},
		},
	};

export const promotionViewEventMock: UniversalAnalyticsEcommercePromoViewEvent =
	{
		ecommerce: {
			promoView: {
				promotions: ecommercePromotionsMock,
			},
		},
	};

export const promotionClickEventMock: UniversalAnalyticsEcommercePromoClickEvent =
	{
		ecommerce: {
			promoClick: {
				promotions: ecommercePromotionsMock,
			},
		},
	};
