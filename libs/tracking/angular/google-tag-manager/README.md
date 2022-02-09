# tracking-angular-google-tag-manager

A simple abstraction to integrate GTM into an Angular project.

# Getting Started

- After installation, import the TrackingAngularGoogleTagManagerModule inside the AppModule imports Array.
- Provide the GTM id on the forRoot method.

```javascript
imports: [
  ...
  TrackingAngularGoogleTagManagerModule.forRoot({
    id: YOUR_GTM_ID,
  })
]
```

# Services

## TrackingGoogleTagManagerService

| Methods                | Arguments           | Description                              |
| ---------------------- |:-------------------:| ----------------------------------------:|
| pushToDataLayer(obj)   | obj<GtmEvent>       | Push GTM events to the dataLayer.        |


### Examples

#### pushToDataLayer(obj);

```javascript
constructor(
  ...
  private trackingGoogleTagManagerService: TrackingGoogleTagManagerService,
) { }
```

```javascript
this.trackingGoogleTagManagerService.pushToDataLayer({
  'ecommerce': {
    'refund': {
      'actionField': {'id': 'T12345'}
    }
  }
});
```

# Development

# Running unit tests

Run `nx affected:test tracking-angular-google-tag-manager --parallel --maxParallel 10 --watch --colors` to execute the unit tests.
