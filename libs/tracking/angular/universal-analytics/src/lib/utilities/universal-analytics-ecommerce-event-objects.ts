import { UniversalAnalyticsEcommerceProductImpressionsEvent } from "@multi-step-funnels/tracking/tracking-models";

export const productImpressionEvent: UniversalAnalyticsEcommerceProductImpressionsEvent = {
    ecommerce: {
      currencyCode: 'EUR',
      impressions: [
        {
          name: 'Triblend Android T-Shirt',
          id: '12345',
          price: '15.25',
          brand: 'Google',
          category: 'Apparel',
          variant: 'Gray',
          list: 'Search Results',
          position: 1
        },
        {
          name: 'Donut Friday Scented T-Shirt',
          id: '67890',
          price: '33.75',
          brand: 'Google',
          category: 'Apparel',
          variant: 'Black',
          list: 'Search Results',
          position: 2
        }
      ]
    }
  };