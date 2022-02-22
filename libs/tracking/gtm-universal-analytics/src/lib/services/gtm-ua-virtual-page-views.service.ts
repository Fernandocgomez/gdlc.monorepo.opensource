import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { GtmService } from './gtm.service';

import { GtmEvent } from '../models/gtm-event.interface';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class GtmUaVirtualPageViewsService {
	private navigationEndObservable?: Observable<NavigationEnd>;
	private isSendingVirtualPageViews = false;

	constructor(
		private gtmService: GtmService,
		private router: Router,
		private title: Title,
	) {}

	public sendVirtualPageViews(): void {
		if (!this.isSendingVirtualPageViews) {
			this.navigationEndObservable = this.createNavigationEndObservable();
			this.listenForNewNavigationEndEvent();
			this.isSendingVirtualPageViews = true;
		}
	}

	private createNavigationEndObservable(): Observable<NavigationEnd> {
		return this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd),
		);
	}

	private listenForNewNavigationEndEvent(): void {
		this.navigationEndObservable?.subscribe((event) => {
			this.pushVirtualPageViewEvent(event.urlAfterRedirects);
		});
	}

	private pushVirtualPageViewEvent(url: string): void {
		const gtmVirtualPageViewEvent: GtmEvent = {
			event: 'virtualPageView',
			url,
			title: this.title.getTitle(),
		};

		this.gtmService.pushToDataLayer(gtmVirtualPageViewEvent);
	}
}
