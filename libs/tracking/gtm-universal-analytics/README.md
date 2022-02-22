<h1>Angular GTM Universal Analytics</h1>
<p>A collection of services, and directives to easily integrate universal analytics features such as:</P>
<ul>
	<li>Virtual page views</li>
	<li>Custom Events</li>
  <li>Ecommerce Events</li>
</ul>

<h1>Directory</h1>
<ul>
  <li>
    <a href="#installation">
      Installation
    </a>
  </li>
  <li>
    <a href="#gtm-config">
      GTM configuration
    </a>
  </li>
  <li>
    <a href="#virtual-page-views">
      How to send virtual pages views?
    </a>
  </li>
  <li>
    <a href="#custom-event">
      How to send custom event?
    </a>
  </li>
  <li>
    <a href="#ecommerce-events">
      how to send Ecommerce events?
    </a>
  </li>
  <li>
    <a href="#development">
      Development
    </a>
  </li>
</ul>

<h1 id="installation">Getting Started:</h1>
<p>After installation, import the GtmUniversalAnalyticsModule into the AppModule imports array and invoke the forRoot method passing an object with the property id pointing to your GTM_ID.</p>

```javascript
imports: [
	...
    GtmUniversalAnalyticsModule.forRoot({
		id: YOUR_GTM_ID,
	}),
],
```

<h1 id="gtm-config">GTM Configuration:</h1>
<p>In order to make this library work with your GTM container, we will need to import some tags, triggers, and variables into your GTM container.</p>
<p>Fortunately, Tag Manager has the option to import configuration from other GTM container into yours.</p>
<a href="#">Click on this link to download the config file in JSON format.</a>
<p>Once you have this file, go to your GTM container and click on the Admin tab. It is right next to the Version tab.</p>
<p>Then, click on Import Container and upload the config file you download.</p>
<p>Select your work space if you have multiple ones or create a new one.</p>
<p>The last option is up to you. If you want to overwrite or merge.</p>
<p>Don't worry about the option you selected. You can alway reverse your changes back.</p>
<p>Before you publish your changes, you will need to make a change to one of the variables.</p>
<p>Go to Variable, and look for "Universal Analytics || Tracking Id". Here you will need to type your own Universal Analytics Id.</p>

<h1>Services:</h1>

<h2 id="virtual-page-views">GtmUaVirtualPageViewsService:</h2>
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

<h1 id="development">Development:</h1>

<h2>Running unit tests:</h2>

<p>Run `nx test tracking-gtm-universal-analytics --watch` to execute the unit tests.</p>
