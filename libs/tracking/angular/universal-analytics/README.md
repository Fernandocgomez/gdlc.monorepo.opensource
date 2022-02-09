# tracking-angular-universal-analytics

A collection of services and modules to easily integrate the virtual page views, custom events and E-commerce universal analytics functionality.

# Getting Started

# Services

## UniversalAnalyticsVirtualPageViewsService 
Note: This service has to be called on the app.component.ts
### Methods

#### trackPageViews()
Create a subscription to the Angular Router to start tracking pages views and send them to GTM dataLayer.
Note: This method needs to be called on the constructor.

##### Example

```javascript
constructor(
  ...
  private universalAnalyticsVirtualPageViewsService: UniversalAnalyticsVirtualPageViewsService,
) {
    this.universalAnalyticsVirtualPageViewsService.trackPageViews();
}
```

# Development

## Running unit tests

Run `nx affected:test tracking-angular-universal-analytics --parallel --maxParallel 10 --watch --colors` to execute the unit tests.
