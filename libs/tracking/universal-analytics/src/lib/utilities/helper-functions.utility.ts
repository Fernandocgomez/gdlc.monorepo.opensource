import {
	GtmEvent,
	UniversalAnalyticsEcommerceAddToCartEvent,
	UniversalAnalyticsEcommerceEvent,
	UniversalAnalyticsEcommerceItem,
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

export const isAnArrayOfTypeUniversalAnalyticsEcommerceItem = (
	array: Array<any>,
) => {
	if (array.length <= 0) {
		return false;
	}

	const firstEcommerceItem = (array as UniversalAnalyticsEcommerceItem[])[0];

	return (
		firstEcommerceItem.id !== undefined && firstEcommerceItem.name !== undefined
	);
};

export const isAnArrayOfTypeUniversalAnalyticsEcommercePromotion = (
	array: Array<any>,
) => {
	if (array.length <= 0) {
		return false;
	}

	const firstEcommercePromotion = (
		array as UniversalAnalyticsEcommerceItem[]
	)[0];

	return (
		firstEcommercePromotion.id !== undefined &&
		firstEcommercePromotion.name !== undefined
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
