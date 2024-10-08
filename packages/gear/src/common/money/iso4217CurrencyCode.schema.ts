import { brand, Literal, Schema } from "@effect/schema/Schema";

export const ISO4217CurrencyCodes = [
  "EUR",
  "AED",
  "AFN",
  "XCD",
  "XCD",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "USD",
  "ARS",
  "USD",
  "EUR",
  "AUD",
  "AWG",
  "EUR",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "EUR",
  "XOF",
  "BGN",
  "BHD",
  "BIF",
  "XOF",
  "EUR",
  "BMD",
  "BND",
  "BOB",
  "USD",
  "BRL",
  "BSD",
  "BTN",
  "NOK",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "AUD",
  "CDF",
  "XAF",
  "XAF",
  "CHF",
  "XOF",
  "NZD",
  "CLP",
  "XAF",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "ANG",
  "AUD",
  "EUR",
  "CZK",
  "EUR",
  "DJF",
  "DKK",
  "XCD",
  "DOP",
  "DZD",
  "USD",
  "EUR",
  "EGP",
  "MAD",
  "ERN",
  "EUR",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "USD",
  "DKK",
  "EUR",
  "XAF",
  "GBP",
  "XCD",
  "GEL",
  "EUR",
  "GBP",
  "GHS",
  "GIP",
  "DKK",
  "GMD",
  "GNF",
  "EUR",
  "XAF",
  "EUR",
  "FKP",
  "GTQ",
  "USD",
  "XOF",
  "GYD",
  "HKD",
  "AUD",
  "HNL",
  "EUR",
  "HTG",
  "HUF",
  "IDR",
  "EUR",
  "ILS",
  "GBP",
  "INR",
  "USD",
  "IQD",
  "IRR",
  "ISK",
  "EUR",
  "GBP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "AUD",
  "KMF",
  "XCD",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "XCD",
  "CHF",
  "LKR",
  "LRD",
  "LSL",
  "EUR",
  "EUR",
  "EUR",
  "LYD",
  "MAD",
  "EUR",
  "MDL",
  "EUR",
  "EUR",
  "MGA",
  "USD",
  "MKD",
  "XOF",
  "MMK",
  "MNT",
  "MOP",
  "USD",
  "EUR",
  "MRU",
  "XCD",
  "EUR",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "XPF",
  "XOF",
  "AUD",
  "NGN",
  "NIO",
  "EUR",
  "NOK",
  "NPR",
  "AUD",
  "NZD",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "XPF",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "EUR",
  "NZD",
  "USD",
  "ILS",
  "EUR",
  "USD",
  "PYG",
  "QAR",
  "EUR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "EUR",
  "NOK",
  "EUR",
  "SLE",
  "EUR",
  "XOF",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "USD",
  "ANG",
  "SYP",
  "SZL",
  "USD",
  "XAF",
  "EUR",
  "XOF",
  "THB",
  "TJS",
  "NZD",
  "USD",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "AUD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "USD",
  "UYU",
  "UZS",
  "EUR",
  "XCD",
  "VES",
  "USD",
  "USD",
  "VND",
  "VUV",
  "XPF",
  "WST",
  "YER",
  "EUR",
  "ZAR",
  "ZMW",
  "ZWL",
] as const;

export const ISO4217CurrencyCode = Literal(...ISO4217CurrencyCodes)
  .annotations({
    description: "Currency code according to ISO 4217.",
    identifier: "ISO4217CurrencyCode",
    title: "ISO 4217 currency code",
  })
  .pipe(brand("ISO4217CurrencyCode"));

export type ISO4217CurrencyCode = Schema.Type<typeof ISO4217CurrencyCode>;
