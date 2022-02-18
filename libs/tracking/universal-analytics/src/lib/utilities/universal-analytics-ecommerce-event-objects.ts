import {
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

export const productImpressionEventMock: UniversalAnalyticsEcommerceProductImpressionsEvent =
	{
		ecommerce: {
			currencyCode: 'EUR',
			impressions: [
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
			],
		},
	};

export const productClickEvent: UniversalAnalyticsEcommerceProductClickEvent = {
	ecommerce: {
		click: {
			actionField: { list: 'Search Results' },
			products: [
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
			],
		},
	},
};

export const ViewProductDetailsEvent: UniversalAnalyticsEcommerceViewProductDetailsEvent =
	{
		ecommerce: {
			detail: {
				actionField: { list: 'Apparel Gallery' },
				products: [
					{
						name: 'Triblend Android T-Shirt',
						id: '12345',
						price: '15.25',
						brand: 'Google',
						category: 'Apparel',
						variant: 'Gray',
					},
				],
			},
		},
	};

export const addToCartEvent: UniversalAnalyticsEcommerceAddToCartEvent = {
	ecommerce: {
		currencyCode: 'EUR',
		add: {
			products: [
				{
					name: 'Triblend Android T-Shirt',
					id: '12345',
					price: '15.25',
					brand: 'Google',
					category: 'Apparel',
					variant: 'Gray',
					quantity: 1,
				},
			],
		},
	},
};
