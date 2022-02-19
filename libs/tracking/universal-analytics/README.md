<h1>tracking-universal-analytics</h1>
<p>A collection of services, and directives to easily integrate the virtual page views, custom events and E-commerce universal analytics functionality.</P>
<p>Note: Further configuration will be needed on the Google Tag Manager.</P>

<h1>Getting Started:</h1>
<p>After installation, import the GoogleTagManagerModule and UniversalAnalyticsModule inside the AppModule imports Array.</p>

```javascript
imports: [
	...GoogleTagManagerModule.forRoot({
		id: YOUR_GTM_ID,
	}),
	UniversalAnalyticsModule,
],
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
<p>The product object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UniversalAnalyticsEcommerceItem[]></li>
	<li>currencyCode: <String> = 'USD'</li>
</ul>
<p>The currencyCode argument has a default value of USD.</p>

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

const ecommerceProducts = [
	{
		name: 'Triblend Android T-Shirt',
		id: '12345',
		price: '15.25',
		brand: 'Google',
		category: 'Apparel',
		variant: 'Gray',
		list: 'Search Results',
		position: 1,
	},
	{
		name: 'Donut Friday Scented T-Shirt',
		id: '67890',
		price: '33.75',
		brand: 'Google',
		category: 'Apparel',
		variant: 'Black',
		list: 'Search Results',
		position: 2,
	},
];

const currencyCode = 'EUR';

this.triggerProductImpressionsEvent(ecommerceProducts, currencyCode);
```

<h3>triggerProductClickEvent();</h3>
<p>Measure clicks on product by sending an "angularProductClick" event to Universal Analytics via the dataLayer, along with the product details to represent the clicked product.</p>
<p>The product object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UniversalAnalyticsEcommerceItem[]></li>
	<li>searchList: <String> = ''</li>
</ul>
<p>The searchList argument has a default value of ''.</p>

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

const ecommerceProduct = [
	{
		name: 'Triblend Android T-Shirt',
		id: '12345',
		price: '15.25',
		brand: 'Google',
		category: 'Apparel',
		variant: 'Gray',
		list: 'Search Results',
		position: 1,
	},
];

const searchList = 'Search Results';

this.triggerProductClickEvent(ecommerceProduct, searchList);
```

<h3>triggerViewProductDetailsEvent();</h3>
<p>Measure a view of product details by pushing an "angularViewProductDetails" event to the dataLayer, along with one or more product details representing the products being viewed.</p>
<p>The product details should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UniversalAnalyticsEcommerceItem[]></li>
	<li>searchList: <String> = ''</li>
</ul>
<p>The searchList argument has a default value of ''.</p>

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

const ecommerceProduct = [
	{
		name: 'Triblend Android T-Shirt',
		id: '12345',
		price: '15.25',
		brand: 'Google',
		category: 'Apparel',
		variant: 'Gray',
		list: 'Search Results',
		position: 1,
	},
];

const searchList = 'Search Results';

this.triggerViewProductDetailsEvent(ecommerceProduct, searchList);
```

<h3>triggerAddToCartEvent();</h3>
<p>Measure adding a product to a shopping cart by sending an "angularAddToCart" event and a list of products to the dataLayer</p>
<p>The product object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UniversalAnalyticsEcommerceItem[]></li>
	<li>currencyCode: <String> = 'USD'</li>
</ul>
<p>The currencyCode argument has a default value of USD.</p>

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

const ecommerceProduct = [
	{
		name: 'Triblend Android T-Shirt',
		id: '12345',
		price: '15.25',
		brand: 'Google',
		category: 'Apparel',
		variant: 'Gray',
		list: 'Search Results',
		position: 1,
	},
];

const currencyCode = 'EUR';

this.triggerAddToCartEvent(ecommerceProduct, currencyCode);
```

<h3>#();</h3>
<p>Measure the removal of a product from a shopping cart by pushing an "angularRemoveFromCart" event to the dataLayer.</p>
<p>The product object should be available at the moment this method is called.</p>
<p>Arguments: removeFromCartEvent: <UniversalAnalyticsEcommerceRemoveProductFromCartEvent></p>
<p>UniversalAnalyticsEcommerceRemoveProductFromCartEvent Interface</p>

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

export interface UniversalAnalyticsEcommerceRemoveProductFromCartEvent {
	ecommerce: {
		remove: {
			products?: UniversalAnalyticsEcommerceItem[],
		},
	};
}
```

<h3>triggerPromotionViewEvent();</h3>
<h3>triggerPromotionClickEvent();</h3>
<h3>triggerCheckoutStepEvent();</h3>
<h3>triggerCheckoutOptionEvent();</h3>
<h3>triggerPurchaseEvent();</h3>
<h3>triggerRefundEvent();</h3>

<h1>Development:</h1>

<h2>Running unit tests:</h2>

<P>Run `nx affected:test tracking-universal-analytics --watch --colors` to execute the unit tests.</P>
