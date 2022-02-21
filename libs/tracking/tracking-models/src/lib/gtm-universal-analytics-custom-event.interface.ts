export interface GtmUniversalAnalyticsCustomEvent {
	event: string;
	category: string;
	action: string;
	label?: string;
	value?: number;
}
