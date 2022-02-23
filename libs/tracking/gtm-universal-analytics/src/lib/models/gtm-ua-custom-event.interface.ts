export interface GtmUaCustomEvent {
	category: string;
	action: string;
	label?: string;
	value?: number;
	nonInteraction?: boolean;
}
