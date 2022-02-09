<h1>tracking-angular-universal-analytics</h1>

A collection of services and modules to easily integrate the virtual page views, custom events and E-commerce universal analytics functionality.

<h1>Getting Started:</h1>

- After installation, import the TrackingAngularUniversalAnalyticsModule inside the AppModule imports Array.

```javascript
imports: [
  ...
  TrackingAngularUniversalAnalyticsModule
]
```

<h1>Services:</h1>

<h2>TrackingGoogleTagManagerService:</h2>

Note: This service has to be called on the app.component.ts

| Methods                | Arguments           | Description                                                                                                                                                               | Example                         |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| trackPageViews();      |                     | Create a subscription to the Angular Router to start tracking pages views and send them to GTM dataLayer. Note: This method needs to be called on the constructor.        | [See Example](#trackPageViews)  |


#### trackPageViews()
Create a subscription to the Angular Router to start tracking pages views and send them to GTM dataLayer.
Note: This method needs to be called on the constructor.

<h1>Examples:</h1>

<h3 id="trackPageViews">trackPageViews();</h3>

```javascript
constructor(
  ...
  private universalAnalyticsVirtualPageViewsService: UniversalAnalyticsVirtualPageViewsService,
) {
  this.universalAnalyticsVirtualPageViewsService.trackPageViews();
}
```

<h1>Development:</h1>

<h2>Running unit tests:</h2>

Run `nx affected:test tracking-angular-universal-analytics --parallel --maxParallel 10 --watch --colors` to execute the unit tests.
