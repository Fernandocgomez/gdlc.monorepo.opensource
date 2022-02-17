<h1>tracking-google-tag-manager</h1>
<p>A simple abstraction to integrate GTM into an Angular project.</p>

<h1>Getting Started:</h1>
<ul>
  <li>After installation, import the GoogleTagManagerModule inside the AppModule imports Array.</li>
  <li>Provide the GTM id on the forRoot method.</li>
</ul>

```javascript
imports: [
	...GoogleTagManagerModule.forRoot({
		id: YOUR_GTM_ID,
	}),
];
```

<h1>Services:</h1>

<h2>GoogleTagManagerService:</h2>

<h3 id="pushToDataLayer">pushToDataLayer(obj);</h3>
<p>Push GTM events to the dataLayer.</p>
<p>Argument: obj<GtmEvent></p>

```javascript
constructor(
  ...
  private GoogleTagManagerService: GoogleTagManagerService,
) { }
```

```javascript
this.GoogleTagManagerService.pushToDataLayer({
	ecommerce: {
		refund: {
			actionField: { id: 'T12345' },
		},
	},
});
```

<h1>Development:</h1>

<h2>Running unit tests:</h2>

<p>Run `nx affected:test tracking-google-tag-manager --parallel --maxParallel 10 --watch --colors` to execute the unit tests.</p>
