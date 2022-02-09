import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

import { GtmEvent } from '@multi-step-funnels/tracking/tracking-models';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniversalAnalyticsVirtualPageViewsService {

  private navigationEndObservable?: Observable<NavigationEnd>;

  constructor(
    private googleTagManagerService: TrackingGoogleTagManagerService,
    private router: Router
  ) {}


  public trackPageViews(): void {
    this.navigationEndObservable = this.createObservable();
    this.listenForNewValuesOnObservable();
  }

  private createObservable(): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter(
        (event): event is NavigationEnd => event instanceof NavigationEnd
      )
    )
  }

  private listenForNewValuesOnObservable(): void {
    this.navigationEndObservable?.subscribe((event) => {
      this.triggerPageView(event.urlAfterRedirects);
    });
  }

  private triggerPageView(url: string): void {
    const gtmPageViewEvent: GtmEvent = {
      event: 'pageView',
      url
    };

    this.googleTagManagerService.pushToDataLayer(gtmPageViewEvent);
  };

}
