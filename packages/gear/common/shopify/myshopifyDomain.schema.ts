import { brand, filter } from "@effect/schema/Schema";

import { Hostname } from "#common/http/hostname.schema.js";

const SHOPIFY_SHOP_FORMAT_NO_PROTOCOL =
  /^[a-zA-Z0-9][a-zA-Z0-9-]*.myshopify.com/;

export const MyshopifyDomain = Hostname.annotations({
  identifier: "MyshopifyDomain",
  title: "MyshopifyDomain",
  description: "A valid .myshopify.com domain",
}).pipe(
  filter((hostname) => SHOPIFY_SHOP_FORMAT_NO_PROTOCOL.test(hostname)),
  brand("MyshopifyDomain"),
);
