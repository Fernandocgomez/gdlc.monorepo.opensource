export const getDataLayer = () => {
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
