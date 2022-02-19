import {
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceItem,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
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

export const viewProductDetailsEventMock: UniversalAnalyticsEcommerceViewProductDetailsEvent =
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

export const addToCartEventMock: UniversalAnalyticsEcommerceAddToCartEvent = {
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

export const removeFromCartEventMock: UniversalAnalyticsEcommerceRemoveProductFromCartEvent =
	{
		ecommerce: {
			remove: {
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
