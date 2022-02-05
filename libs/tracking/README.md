# Tracking Libraries

A collection of tracking libraries for Angular and React applications.

## Angular Libraries

#### google-tag-manager: 
This library abstracts the injection of GTM tag and the creation of the dataLayer. Also, provide an injectable service with the pushToDataLayer method to send the data to the GTM.

#### google-analytics-4: 
This library abstracts the multiple ways to send events to Google Analytics 4. Out of the box, the library will hook into the angular router to start sending virtual page views. Let's keep in mind that Enhanced measurement is configured correctly to avoid double counting page views on history state changes. Note: further configuration might be needed on the GTM portal. The library is divided into three modules:
 - GoogleAnalytics4EcommerceEventsMo
 
 dule
 - GoogleAnalytics4VirtualPageViewsModule
 - GoogleAnalytics4GenericEventsModule

#### universal-analytics:
Similar to the Google Analytics 4 library, this library abstracts the multiple ways to send events to Universal Analytics. Out of the box, the library will hook into the angular router to start sending virtual page views. Note: further configuration might be needed on the GTM portal. The library is divided into three modules:
 - UniversalAnalyticsEcommerceEventsModule
 - UniversalAnalyticsVirtualPageViewsModule
 - UniversalAnalyticsCustomEventsModule

## React Libraries