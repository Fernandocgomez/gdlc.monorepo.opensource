export const listOfCurrencyCodeSupportedByUA = [
	'USD',
	'AED',
	'ARS',
	'AUD',
	'BGN',
	'BOB',
	'BRL',
	'CAD',
	'CHF',
	'CLP',
	'CNY',
	'COP',
	'CZK',
	'DKK',
	'EGP',
	'EUR',
	'FRF',
	'GBP',
	'HKD',
	'HRK',
	'HUF',
	'IDR',
	'ILS',
	'JPY',
	'KRW',
	'LTL',
	'MAD',
	'MXN',
	'MYR',
	'NOK',
	'NZD',
	'PEN',
	'PHP',
	'PKR',
	'PLN',
	'RON',
	'RSD',
	'RUB',
	'SAR',
	'SEK',
	'SGD',
	'THB',
	'TRY',
	'TWD',
	'UAH',
	'VEF',
	'VND',
	'ZAR',
] as const;

export type CurrencyCode = typeof listOfCurrencyCodeSupportedByUA[number];
