<h1>tracking-angular-universal-analytics</h1>

<p>A collection of services and modules to easily integrate the virtual page views, custom events and E-commerce universal analytics functionality.</P>
<p>Note: Further configuration will be needed on the Google Tag Manager.</P>

<h1>Getting Started:</h1>

<p>After installation, import the TrackingAngularGoogleTagManagerModule and TrackingAngularUniversalAnalyticsModule inside the AppModule imports Array.</p>

```javascript
imports: [
	...TrackingAngularGoogleTagManagerModule.forRoot({
		id: YOUR_GTM_ID,
	}),
	TrackingAngularUniversalAnalyticsModule,
];
```

<h1>Services:</h1>

<h2>UniversalAnalyticsVirtualPageViewsService:</h2>

<p>Note: This service has to be called on the app.component.ts</p>

<h3>trackPageViews();</h3>

<p>Create a subscription to the Angular Router to start tracking pages views and send them to GTM dataLayer.</p>
<p>Note: This method needs to be called on the constructor.</p>

```javascript
constructor(
  ...
  private universalAnalyticsVirtualPageViewsService: UniversalAnalyticsVirtualPageViewsService,
) {
  this.universalAnalyticsVirtualPageViewsService.trackPageViews();
};

```

<h2>UniversalAnalyticsCustomEventsService:</h2>

<h3>triggerCustomEvent();</h3>

<p>Send a Universal Analytics Event sending a "customEvent" event using the GTM dataLayer.</p>
<p>Argument: gtmObj<GtmUniversalAnalyticsCustomEvent></p>
<p>GtmUniversalAnalyticsCustomEvent Interface</p>

```javascript
interface GtmUniversalAnalyticsCustomEvent {
	event: string;
	category: string;
	action: string;
	label?: string;
	value?: number;
}
```

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
};
```

<h2>UniversalAnalyticsEcommerceEventsService</h2>

<h3>triggerProductImpressionsEvent();</h3>
<p>Send an "angularProductImpressions" event to Universal Analytics via the dataLayer.</p>
<p>When calling this method make sure, you have access to your products displayed details.</p>
<p>Arguments: productImpressionsEvent<UniversalAnalyticsEcommerceProductImpressionsEvent></p>
<p>UniversalAnalyticsEcommerceProductImpressionsEvent Interface</p>

```javascript
interface UniversalAnalyticsEcommerceItem {
	name: string;
	id: string;
	price?: string;
	brand?: string;
	category?: string;
	variant?: string;
	list?: string;
	position?: number;
	quantity?: number;
	coupon?: string;
}

interface UniversalAnalyticsEcommerceProductImpressionsEvent {
	ecommerce: {
		currencyCode?: string,
		impressions: UniversalAnalyticsEcommerceItem[],
	};
}
```

<h3>triggerProductClickEvent();</h3>
<p>Measure clicks on product by sending an "angularProductClick" event to Universal Analytics via the dataLayer, along with the product details to represent the clicked product.</p>
<p>The product object should be available at the moment this method is called.</p>
<p>Arguments: productClickEvent: <UniversalAnalyticsEcommerceProductClickEvent></p>
<p>UniversalAnalyticsEcommerceProductClickEvent Interface</p>

```javascript
interface UniversalAnalyticsEcommerceItem {
	name: string;
	id: string;
	price?: string;
	brand?: string;
	category?: string;
	variant?: string;
	list?: string;
	position?: number;
	quantity?: number;
	coupon?: string;
}

interface UniversalAnalyticsEcommerceProductClickEvent {
	ecommerce: {
		click: {
			actionField?: {
				list?: string,
			},
			products?: UniversalAnalyticsEcommerceItem[],
		},
	};
}
```

<h3>triggerViewProductDetailsEvent();</h3>
<p>Measure a view of product details by pushing an "angularViewProductDetails" event to the dataLayer, along with one or more product details representing the products being viewed.</p>
<p>The product details should be available at the moment this method is called.</p>
<p>Arguments: viewProductDetailsEvent: <UniversalAnalyticsEcommerceViewProductDetailsEvent></p>
<p>UniversalAnalyticsEcommerceProductClickEvent Interface</p>

```javascript
interface UniversalAnalyticsEcommerceItem {
	name: string;
	id: string;
	price?: string;
	brand?: string;
	category?: string;
	variant?: string;
	list?: string;
	position?: number;
	quantity?: number;
	coupon?: string;
}

interface UniversalAnalyticsEcommerceViewProductDetailsEvent {
	ecommerce: {
		detail: {
			actionField?: {
				list?: string,
			},
			products?: UniversalAnalyticsEcommerceItem[],
		},
	};
}
```

<h3>triggerAddToCartEvent();</h3>
<p>Measure adding a product to a shopping cart by using an "angularAddToCart" event and a list of products</p>
<p>The product object should be available at the moment this method is called.</p>
<p>Arguments: addToCartEvent: <UniversalAnalyticsEcommerceAddToCartEvent></p>
<p>UniversalAnalyticsEcommerceAddToCartEvent Interface</p>

```javascript
interface UniversalAnalyticsEcommerceItem {
	name: string;
	id: string;
	price?: string;
	brand?: string;
	category?: string;
	variant?: string;
	list?: string;
	position?: number;
	quantity?: number;
	coupon?: string;
}

export interface UniversalAnalyticsEcommerceAddToCartEvent {
	ecommerce: {
		currencyCode?: string,
		add: {
			products?: UniversalAnalyticsEcommerceItem[],
		},
	};
}
```

<h3>triggerRemoveFromCartEvent();</h3>
<h3>triggerPromotionViewEvent();</h3>
<h3>triggerPromotionClickEvent();</h3>
<h3>triggerCheckoutStepEvent();</h3>
<h3>triggerCheckoutOptionEvent();</h3>
<h3>triggerPurchaseEvent();</h3>
<h3>triggerRefundEvent();</h3>

<h1>Development:</h1>

<h2>Running unit tests:</h2>

<P>Run `nx affected:test tracking-angular-universal-analytics --parallel --maxParallel 10 --watch --colors` to execute the unit tests.</P>
