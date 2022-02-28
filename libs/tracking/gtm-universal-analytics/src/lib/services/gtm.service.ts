import { Inject, Injectable, Optional } from '@angular/core';

import { GtmEvent, GtmConfig } from '../models';

declare global {
	interface Window {
		dataLayer: Array<GtmEvent>;
	}
}

@Injectable({
	providedIn: 'root',
})
export class GtmService {
	constructor(
		@Optional()
		@Inject('GtmConfig')
		private config: GtmConfig = { id: null },
	) {
		this.initDataLayer();
	}

	private initDataLayer(): void {
		this.throwErrorWhenPassingInvalidGtmId();
		this.createDataLayer();
		this.pushStartEventToDataLayer();
		this.addGtmScriptToDom();
	}

	private throwErrorWhenPassingInvalidGtmId(): void {
		if (!this.config.id) {
			throw new Error('GTM Id not provided.');
		}
	}

	private createDataLayer(): void {
		window.dataLayer = window.dataLayer || [];
	}

	private pushStartEventToDataLayer(): void {
		this.pushToDataLayer({
			'gtm.start': new Date().getTime(),
			event: 'gtm.js',
		});
	}

	private addGtmScriptToDom(): void {
		if (!this.gtmScriptTagExistOnDom()) {
			const gtmScriptTag = this.createGtmScriptTag();

			document.head.insertBefore(gtmScriptTag, document.head.firstChild);
		}
	}

	private gtmScriptTagExistOnDom(): boolean {
		return document.getElementById('GTMscript') ? true : false;
	}

	private createGtmScriptTag(): HTMLScriptElement {
		const gtmScript = document.createElement('script');
		gtmScript.id = 'GTMscript';
		gtmScript.async = true;
		gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${this.config.id}`;

		return gtmScript;
	}

	public pushToDataLayer(obj: GtmEvent): void {
		window?.dataLayer.push(obj);
	}

	public clearEcommerceObject(): void {
		const ecommerceNull: GtmEvent = {
			event: '',
			ecommerce: null,
		};

		this.pushToDataLayer(ecommerceNull);
	}
}
