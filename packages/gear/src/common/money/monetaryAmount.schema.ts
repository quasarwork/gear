import { brand, filter, Int, Schema } from "@effect/schema/Schema";

import { StringFromNumberOrString } from "../string/schemas/stringFromNumberOrString.schema.js";

const hasValidMonetaryFormat = (value: string): boolean => {
  const SEPARATOR = ".";
  const DECIMALS = 2;

  const [integerPart, decimalsPart] = value.split(SEPARATOR);

  return (
    !Number.isNaN(Number(integerPart)) &&
    !Number.isNaN(Number(decimalsPart)) &&
    !!decimalsPart &&
    decimalsPart.length === DECIMALS
  );
};

const isNegative = (value: string): boolean =>
  !Number.isNaN(Number(value)) && Number(value) < 0;

export const MonetaryAmount = StringFromNumberOrString.annotations({
  description: "A monetary amount accepting a string or a number",
  identifier: "MonetaryAmount",
  title: "MonetaryAmount",
}).pipe(filter(hasValidMonetaryFormat), brand("MonetaryAmount"));
export type MonetaryAmount = Schema.Type<typeof MonetaryAmount>;

export const MonetaryAmountNonNegative = MonetaryAmount.annotations({
  description: "A monetary amount accepting a string or a number",
  identifier: "MonetaryAmountNonNegative",
  title: "MonetaryAmountNonNegative",
}).pipe(
  filter((value) => !isNegative(value)),
  brand("MonetaryAmountNonNegative"),
);
export type MonetaryAmountNonNegative = Schema.Type<
  typeof MonetaryAmountNonNegative
>;

export const MonetaryAmountAsCents = Int.annotations({
  description: "A monetary amount in cents",
  identifier: "MonetaryAmountAsCents",
  title: "MonetaryAmountAsCents",
}).pipe(brand("MonetaryAmountAsCents"));
export type MonetaryAmountAsCents = Schema.Type<typeof MonetaryAmountAsCents>;
