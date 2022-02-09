<h1>tracking-angular-google-tag-manager</h1>

A simple abstraction to integrate GTM into an Angular project.

<h1>Getting Started:</h1>

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

<h1>Services:</h1>

<h2>TrackingGoogleTagManagerService:</h2>

| Methods                | Arguments           | Description                              | Example                         |
| ---------------------- | ------------------- | ---------------------------------------- | ------------------------------- |
| pushToDataLayer(obj)   | obj<GtmEvent>       | Push GTM events to the dataLayer.        | [See Example](#pushToDataLayer) |


<h1>Examples:</h1>


<h3 id="pushToDataLayer">pushToDataLayer(obj);</h3>

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

<h1>Development:</h1>

<h1>Running unit tests:</h1>

Run `nx affected:test tracking-angular-google-tag-manager --parallel --maxParallel 10 --watch --colors` to execute the unit tests.
