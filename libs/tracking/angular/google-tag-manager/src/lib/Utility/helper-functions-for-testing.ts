import { GtmEvent } from "@multi-step-funnels/tracking/tracking-models";

export const getDataLayer = (): GtmEvent[] => {
	return window.dataLayer;
};

export const getGtmScriptTagFromDom = (): HTMLElement | null => {
	return document.getElementById('GTMscript');
};

export const destroyDataLayer = (): void => {
	(window.dataLayer as any) = null;
};

export const removeGtmScriptTagFromDom = (): void => {
	getGtmScriptTagFromDom()?.remove();
};
