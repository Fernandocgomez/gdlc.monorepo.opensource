# tracking-angular-google-tag-manager

An simple abstraction to integrate GTM into an Angular project.

# Getting Started

- After instalation, import the TrackingAngularGoogleTagManagerModule inside the AppModuel imports Array.
- Provide the GTM id on the forRoot method.

```
imports: [
  ...
  TrackingAngularGoogleTagManagerModule.forRoot({
    id: YOUR_GTM_ID,
  })
]
```

- Inject the TrackingGoogleTagManagerService on the AppComponent.ts constructor.

```javascript
constructor(
  ...
  private trackingGoogleTagManagerService: TrackingGoogleTagManagerService,
) { }
```

- To push events to GTM using the TrackingGoogleTagManagerService.

```
this.trackingGoogleTagManagerService.pushToDataLayer({
  'ecommerce': {
    'refund': {
      'actionField': {'id': 'T12345'}
    }
  }
});
```

# Running unit tests

Run `nx test tracking-angular-google-tag-manager` to execute the unit tests.
