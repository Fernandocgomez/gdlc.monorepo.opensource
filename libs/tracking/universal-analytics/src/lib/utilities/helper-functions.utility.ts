import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
	UniversalAnalyticsEcommerceRemoveProductFromCartEvent,
	UniversalAnalyticsEcommerceViewProductDetailsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

export const isOfTypeGtmEvent = (value: any) => {
	return (value as GtmEvent).event !== undefined;
};

export const isOfTypeUniversalAnalyticsEcommerceEvent = (
	value: any,
): boolean => {
	return (value as UniversalAnalyticsEcommerceEvent).ecommerce !== undefined;
};

export const isOfTypeUniversalAnalyticsEcommerceProductClickEvent = (
	value: any,
) => {
	return (
		(value as UniversalAnalyticsEcommerceProductClickEvent).ecommerce !==
		undefined
	);
};

export const isOfTypeUniversalAnalyticsEcommerceProductImpressionsEvent = (
	value: any,
) => {
	return (
		(value as UniversalAnalyticsEcommerceProductImpressionsEvent).ecommerce !==
		undefined
	);
};

export const isOfTypeUniversalAnalyticsEcommerceViewProductDetailsEvent = (
	value: any,
) => {
	return (
		(value as UniversalAnalyticsEcommerceViewProductDetailsEvent).ecommerce !==
		undefined
	);
};

export const isOfTypeUniversalAnalyticsEcommerceAddToCartEvent = (
	value: any,
) => {
	return (
		(value as UniversalAnalyticsEcommerceAddToCartEvent).ecommerce !== undefined
	);
};

export const isOfTypeUniversalAnalyticsEcommerceRemoveProductFromCartEvent = (
	value: any,
) => {
	return (
		(value as UniversalAnalyticsEcommerceRemoveProductFromCartEvent)
			.ecommerce !== undefined
	);
};
