import {
	GtmEvent,
	UniversalAnalyticsEcommerceProductClickEvent,
	UniversalAnalyticsEcommerceProductImpressionsEvent,
} from '@multi-step-funnels/tracking/tracking-models';

export const isOfTypeUniversalAnalyticsEcommerceProductClickEvent = (
	value: any,
) => {
	return (
		(value as UniversalAnalyticsEcommerceProductClickEvent).ecommerce !==
		undefined
	);
};

export const isOfTypeGtmEvent = (value: any) => {
	return (value as GtmEvent).event !== undefined;
};

export const isOfTypeUniversalAnalyticsEcommerceProductImpressionsEvent = (
	value: any,
) => {
	return (
		(value as UniversalAnalyticsEcommerceProductImpressionsEvent).ecommerce !==
		undefined
	);
};
