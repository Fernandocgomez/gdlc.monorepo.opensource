import { Inject, Injectable, Optional } from '@angular/core';

import {
	GtmEvent,
	GoogleTagManagerConfig,
} from '@multi-step-funnels/tracking/tracking-models';

declare global {
	interface Window {
		dataLayer: Array<GtmEvent>;
	}
}

@Injectable({
	providedIn: 'root',
})
export class TrackingGoogleTagManagerService {
	constructor(
		@Optional()
		@Inject('GoogleTagManagerConfig')
		private config: GoogleTagManagerConfig = { id: null },
	) {
		this.init();
	}

	private init(): void {
		this.throwErrorWhenMissingId();
		this.createDataLayer();
		this.addGtmToDomWhenTagDoNotExist();
	}

	private throwErrorWhenMissingId(): void {
		if (!this.config.id) {
			throw new Error('Google tag manager ID not provided.');
		}
	}

	private createDataLayer(): void {
		window.dataLayer = window.dataLayer || [];
	}

	private addGtmToDomWhenTagDoNotExist(): void {
		if (!this.gtmScriptTagExistOnDom()) {
			this.addGtmToDom();
		}
	}

	private gtmScriptTagExistOnDom(): boolean {
		return document.getElementById('GTMscript') ? true : false;
	}

	private addGtmToDom() {
		this.pushStartEventToDataLayer();

		const gtmScript = this.createGtmScript();

		document.head.insertBefore(gtmScript, document.head.firstChild);
	}

	private pushStartEventToDataLayer(): void {
		this.pushToDataLayer({
			'gtm.start': new Date().getTime(),
			event: 'gtm.js',
		});
	}

	private createGtmScript(): HTMLScriptElement {
		const gtmScript = document.createElement('script');
		gtmScript.id = 'GTMscript';
		gtmScript.async = true;
		gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${this.config.id}`;

		return gtmScript;
	}

	public pushToDataLayer(obj: GtmEvent): void {
		window.dataLayer.push(obj);
	}

	public clearEcommerceObject(): void {
		const ecommerceNull: GtmEvent = {
			event: '',
			ecommerce: null,
		};

		this.pushToDataLayer(ecommerceNull);
	}
}
