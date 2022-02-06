import { Inject, Injectable, Optional } from '@angular/core';

import { TrackingGoogleTagManagerConfig } from './tracking-google-tag-manger-config.model';

declare global {
	interface Window {
		dataLayer: Array<object>;
	}
}

@Injectable({
	providedIn: 'root',
})
export class TrackingGoogleTagManagerService {
	constructor(
		@Optional()
		@Inject('TrackingGoogleTagManagerConfig')
		private config: TrackingGoogleTagManagerConfig = { id: null },
	) {
		this.init();
	}

	private init(): void {
		this.throwErrorWhenMissingId();
		this.createDataLayer();
		this.addGtmToDomWhenTagDoNotExist();
	}

	private throwErrorWhenMissingId() {
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

	public pushToDataLayer(obj: object): void {
		window.dataLayer.push(obj);
	}
}
