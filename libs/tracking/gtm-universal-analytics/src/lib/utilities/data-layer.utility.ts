import { GtmEvent } from '../models';

declare global {
	interface Window {
		dataLayer: Array<GtmEvent>;
	}
}

export class DataLayer {
	static getDataLayer = (): GtmEvent[] => {
		return window.dataLayer;
	};

	static setToUndefined = () => {
		(window.dataLayer as any) = undefined;
	};

	static getLastElement = (): GtmEvent => {
		const dataLayer = this.getDataLayer();
		return dataLayer[dataLayer.length - 1];
	};

	static isEmpty = (): boolean => {
		return this.getDataLayer().length <= 0;
	};

	static setToEmptyArray(): void {
		window.dataLayer = [];
	}
}
