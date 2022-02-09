<h1>Tracking Libraries</h1>

A collection of tracking libraries for Angular and React applications.

<h1>Angular Libraries</h1>

<h2>google-tag-manager:</h2>

This library abstracts the injection of GTM tag and the creation of the dataLayer. Also, provide an injectable service with the pushToDataLayer method to send the data to the GTM.

<h2>google-analytics-4:</h2>

This library abstracts the multiple ways to send events to Google Analytics 4. Out of the box, the library will hook into the angular router to start sending virtual page views. Let's keep in mind that Enhanced measurement is configured correctly to avoid double counting page views on history state changes. Note: further configuration might be needed on the GTM portal. The library is divided into three modules:

- GoogleAnalytics4EcommerceEventsModule
- GoogleAnalytics4VirtualPageViewsModule
- GoogleAnalytics4GenericEventsModule

<h2>universal-analytics:</h2>

Similar to the Google Analytics 4 library, this library abstracts the multiple ways to send events to Universal Analytics. Out of the box, the library will hook into the angular router to start sending virtual page views. Note: further configuration might be needed on the GTM portal.


<h2>tracking-models

Shared interfaces and classes across the tracking libraries and apps. 

<h1>React Libraries:</h1>

Coming soon...