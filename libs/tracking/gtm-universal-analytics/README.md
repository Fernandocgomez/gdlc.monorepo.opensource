<h1>gtm-universal-analytics</h1>
<p>A collection of services, and directives to easily integrate universal analytics features such as:</P>
<ul>
	<li>Virtual page views</li>
	<li>Custom Events</li>
  <li>Ecommerce Events</li>
</ul>
<p>Note: Further configuration will be needed on the Google Tag Manager.</P>

<h1>Getting Started:</h1>
<p>After installation, import the GtmUniversalAnalyticsModule into the AppModule imports array and invoke the forRoot method passing an object with the property id pointing to your GTM_ID.</p>

```javascript
imports: [
	...
    GtmUniversalAnalyticsModule.forRoot({
		id: YOUR_GTM_ID,
	}),
],
```

<h1>Services:</h1>

<h2>GtmUaVirtualPageViewsService:</h2>
<p>Note: This service has to be called on the app.component.ts</p>

<h3>sendVirtualPageViews();</h3>
<p>Create a subscription to the Angular Router to start sending virtual page views to Universal Analytics via the dataLayer</p>
<p>Note: This method needs to be called on the constructor.</p>

```javascript
constructor(
  ...
  private gtmUaVirtualPageViewsService: GtmUaVirtualPageViewsService,
) {
  this.gtmUaVirtualPageViewsService.sendVirtualPageViews();
};
```

<h1>Development:</h1>

<h2>Running unit tests:</h2>

<p>Run `nx test tracking-gtm-universal-analytics --watch` to execute the unit tests.</p>
