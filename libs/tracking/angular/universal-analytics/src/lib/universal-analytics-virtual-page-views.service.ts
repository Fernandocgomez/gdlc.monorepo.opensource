import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { TrackingGoogleTagManagerService } from '@multi-step-funnels/tracking/angular/google-tag-manager';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniversalAnalyticsVirtualPageViewsService {

  private navigationEndObservable?: Observable<NavigationEnd>;
  private currentUrlAfterRedirects = '';

  constructor(
    private googleTagManagerService: TrackingGoogleTagManagerService,
    private router: Router
  ) {
    this.init();
  }

  private init(): void {
    this.startTrackingPageViews();
  }

  private startTrackingPageViews(): void {
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
      this.saveCurrentUrlAfterRedirectsValue(event.urlAfterRedirects);
      this.triggerPageView();
    });
  }

  private saveCurrentUrlAfterRedirectsValue(newUrlAfterRedirectsValue: string): void {
    this.currentUrlAfterRedirects = newUrlAfterRedirectsValue;
  }

  private triggerPageView(): void {
    const gtmPageViewEvent = {
      event: 'pageView',
      url: this.currentUrlAfterRedirects
    };

    this.googleTagManagerService.pushToDataLayer(gtmPageViewEvent);
  };

}
