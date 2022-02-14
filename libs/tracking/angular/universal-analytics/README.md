<h1>tracking-angular-universal-analytics</h1>

A collection of services and modules to easily integrate the virtual page views, custom events and E-commerce universal analytics functionality.

Note: Further configuration will be needed on the Google Tag Manager.

<h1>Getting Started:</h1>

- After installation, import the TrackingAngularGoogleTagManagerModule and TrackingAngularUniversalAnalyticsModule inside the AppModule imports Array.

```javascript
imports: [
	...TrackingAngularGoogleTagManagerModule.forRoot({
		id: YOUR_GTM_ID,
	}),
	TrackingAngularUniversalAnalyticsModule,
];
```

<h1>Services:</h1>

<h2>TrackingGoogleTagManagerService:</h2>
<p>Note: This service has to be called on the app.component.ts</p>

<h3 id="trackPageViews">trackPageViews();</h3>
<p>Create a subscription to the Angular Router to start tracking pages views and send them to GTM dataLayer.</p>
<p>Note: This method needs to be called on the constructor.</p>

```javascript
constructor(
  ...
  private universalAnalyticsVirtualPageViewsService: UniversalAnalyticsVirtualPageViewsService,
) {
  this.universalAnalyticsVirtualPageViewsService.trackPageViews();
}

```

<h3 id="triggerCustomEvent">triggerCustomEvent();</h3>
<p>Send a Universal Analytics custom event using the GTM dataLayer.</p>
<p>Argument: gtmObj<GtmUniversalAnalyticsCustomEvent></p>

```html
<a (click)="redirectToFacebookPage()">Facebook</a>
```

```javascript

public redirectToFacebookPage(): void {

  const gtmCustomEventPayload = {
    event: 'customEvent',
    category: 'social media',
    action: 'click',
    label: 'facebook icon',
    value: 100
  };

  this.universalAnalyticsCustomEventsService.triggerCustomEvent(gtmCustomEventPayload);

  location.href = 'https://facebook.com/xyz-company';
}
```

<h1>Development:</h1>

<h2>Running unit tests:</h2>

Run `nx affected:test tracking-angular-universal-analytics --parallel --maxParallel 10 --watch --colors` to execute the unit tests.
