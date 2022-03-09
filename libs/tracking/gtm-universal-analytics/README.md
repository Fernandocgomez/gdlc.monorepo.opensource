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
      How to send custom events?
    </a>
  </li>
  <li>
    <a href="#ecommerce-events">
      How to send Ecommerce events?
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
<p><a href="https://d376v9a04nevx9.cloudfront.net/gtm-config.json" download>Click on this link to download the config file in JSON format.</a></p>
<p>Once you have the file, go to your GTM container and click on the "Admin" tab. It is right next to the "Version" tab.</p>
<p>Then, click on "Import Container" and upload the config file you download.</p>
<p>Select your work space if you have multiple ones or create a new one.</p>
<p>The last option is up to you. If you want to overwrite or merge.</p>
<p>Don't worry about the option you select. You can alway reverse your changes back.</p>
<p>Before you publish your changes, you will need to make a change to one of the variables.</p>
<p>Click on Variables on the left side hand, and look for "Universal Analytics || Tracking Id". Here you will need to type your own Universal Analytics Id.</p>
<p>And done!</p>

<h1 id="ua-ecommerce-config">Universal Analytics Ecommerce Configurations:</h1>
<p>To enable th Ecommerce, click on "Admin" on the left bottom left corner of your Universal Analytics dashboard.</p>
<p>On the the "View" column, click on "Ecommerce Settings" ans set Enable Ecommerce to ON.</p>

<h2 id="virtual-page-views">GtmUaVirtualPageViewsService:</h2>
<p>Note: This service has to be called on the app.component.ts</p>

<h3>sendVirtualPageViews();</h3>
<p>Create a subscription to the Angular Router to start sending virtual page views to Universal Analytics via the dataLayer</p>
<p>Note: This method needs to be called on the constructor.</p>

<h4>Example:</h4>

```javascript
constructor(
  ...
  private gtmUaVirtualPageViewsService: GtmUaVirtualPageViewsService,
) {
  this.gtmUaVirtualPageViewsService.sendVirtualPageViews();
};
```

<h2 id="custom-event">GtmUaCustomEventsService:</h2>
<p>Before start sending events from your Angular app, read the <a href="#gtm-config">GTM Configuration section</a></p>

<h3>sendCustomEvent(customEvent: GtmUaCustomEvent);</h3>
<p>Send custom events to Universal Analytics via the GTM dataLayer.</p>
<p>If you're unfamiliar with events in Google Analytics you should first read the article <a href="https://support.google.com/analytics/answer/1033068">About Events</a></p>

<h4>Example:</h4>

```javascript
interface GtmUaCustomEvent {
	category: string;
	action: string;
	label?: string;
	value?: number;
	nonInteraction?: boolean;
}
```

```html
<a (click)="redirectToFacebookPage()">Facebook</a>
```

```javascript
public redirectToFacebookPage(): void {

  const gtmCustomEvent = {
    category: 'social media',
    action: 'click',
    label: 'facebook icon',
    value: 100,
    nonInteraction: false
  };

  this.gtmUaCustomEventsService.sendCustomEvent(gtmCustomEvent);

  location.href = 'https://facebook.com/xyz-company';
};
```

<h2 id="ecommerce-events">GtmUaEcommerceEventsService:</h2>
<p>Before start sending ecommerce events from your Angular app, read: </p>
<ul>
	<li><a href="#gtm-config">GTM Configuration section</a></li>
	<li><a href="#ua-ecommerce-config">Universal Analytics Ecommerce Configurations section</a></li>
</ul>

<h3>sendProductImpressionsEvent(products: UaEcommerceProduct[], currencyCode: CurrencyCode = 'USD');</h3>
<p>Send an "angularEcommerce" event to Universal Analytics via the dataLayer.</p>
<p>The object pushed to the dataLayer contains ecommerce meta data for measuring product impressions</p>
<p>The product object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UaEcommerceProduct[]></li>
	<li>currencyCode: <CurrencyCode> = 'USD'</li>
</ul>
<p>The currencyCode argument has a default value of USD.</p>

```javascript
interface UaEcommerceProduct {
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

const ecommerceProducts: UaEcommerceProduct = [
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

this.gtmUaEcommerceEventsService.sendProductImpressionsEvent(
	ecommerceProducts,
	currencyCode,
);
```

<h3>sendProductClickEvent(products: UaEcommerceProduct[], searchList?: string);</h3>
<p>Send an "angularEcommerce" event to Universal Analytics via the dataLayer.</p>
<p>The object pushed to the dataLayer contains ecommerce meta data for measuring product clicks</p>
<p>The products object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UaEcommerceProduct[]></li>
	<li>searchList: <string></li>
</ul>
<p>The searchList argument is optional.</p>

```javascript
interface UaEcommerceProduct {
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

const ecommerceProducts: UaEcommerceProduct = [
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

const searchList = 'T-shirts clearance';

this.gtmUaEcommerceEventsService.sendProductClickEvent(
	ecommerceProducts,
	searchList,
);
```

<h3>sendViewProductDetailsEvent(products: UaEcommerceProduct[], searchList?: string);</h3>
<p>Send an "angularEcommerce" event to Universal Analytics via the dataLayer.</p>
<p>The object pushed to the dataLayer contains ecommerce meta data for measuring product details views</p>
<p>The products object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UaEcommerceProduct[]></li>
	<li>searchList: <string></li>
</ul>
<p>The searchList argument is optional.</p>

```javascript
interface UaEcommerceProduct {
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

const ecommerceProducts: UaEcommerceProduct = [
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

const searchList = 'T-shirts clearance';

this.gtmUaEcommerceEventsService.sendViewProductDetailsEvent(
	ecommerceProducts,
	searchList,
);
```

<h3>sendAddToCartEvent(products: UaEcommerceProduct[], currencyCode: CurrencyCode = 'USD');</h3>
<p>Send an "angularEcommerce" event to Universal Analytics via the dataLayer.</p>
<p>The object pushed to the dataLayer contains ecommerce meta data for measuring product add to cart</p>
<p>The products object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UaEcommerceProduct[]></li>
	<li>currencyCode: <CurrencyCode> = 'USD'</li>
</ul>
<p>The currencyCode argument has a default value of USD.</p>
<p>Note: Make sure the products argument passed is not an empty Array.</p>

```javascript
interface UaEcommerceProduct {
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

const ecommerceProduct: UaEcommerceProduct = [
	{
		name: 'Triblend Android T-Shirt',
		id: '12345',
		price: '15.25',
		brand: 'Google',
		category: 'Apparel',
		variant: 'Gray',
		list: 'Search Results',
		position: 4,
	},
];

const currencyCode = 'EUR';

this.gtmUaEcommerceEventsService.sendAddToCartEvent(
	ecommerceProducts,
	currencyCode,
);
```

<h3>sendRemoveProductFromCartEvent(products: UaEcommerceProduct[]);</h3>
<p>Send an "angularEcommerce" event to Universal Analytics via the dataLayer.</p>
<p>The object pushed to the dataLayer contains ecommerce meta data for measuring product removable from the shopping cart.</p>
<p>The products object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>products: <UaEcommerceProduct[]></li>
</ul>
<p>Note: Make sure the products argument passed is not an empty Array.</p>

```javascript
interface UaEcommerceProduct {
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

const ecommerceProduct: UaEcommerceProduct = [
	{
		name: 'Triblend Android T-Shirt',
		id: '12345',
		price: '15.25',
		brand: 'Google',
		category: 'Apparel',
		variant: 'Gray',
		list: 'Search Results',
		position: 4,
	},
];

this.gtmUaEcommerceEventsService.sendRemoveProductFromCartEvent(
	ecommerceProducts,
);
```

<h3>sendPromotionImpressionsEvent(promotions: UaEcommercePromotion[]);</h3>
<p>Send an "angularEcommerce" event to Universal Analytics via the dataLayer.</p>
<p>The object pushed to the dataLayer contains ecommerce meta data for measuring promotion impressions.</p>
<p>The promotion object should be available at the moment this method is called.</p>
<p>Arguments: </p>
<ul>
	<li>promotions: <UaEcommercePromotion[]></li>
</ul>
<p>Note: Make sure the promotions argument passed is not an empty Array.</p>

```javascript
interface UaEcommercePromotion {
	id: string;
	name: string;
	creative?: string;
	position?: string;
}

const ecommercePromotions = [
	{
		id: 'JUNE_PROMO13',
		name: 'June Sale',
		creative: 'banner1',
		position: 'slot1',
	},
	{
		id: 'FREE_SHIP13',
		name: 'Free Shipping Promo',
		creative: 'skyscraper1',
		position: 'slot2',
	},
];

this.gtmUaEcommerceEventsService.sendPromotionImpressionsEvent(
	ecommercePromotions,
);
```

<h1 id="development">Development:</h1>

<h2>Running unit tests:</h2>

<p>Run `nx test tracking-gtm-universal-analytics --watch` to execute the unit tests.</p>
