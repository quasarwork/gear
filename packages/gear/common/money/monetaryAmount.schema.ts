import { Int, Schema, brand, filter } from "@effect/schema/Schema";

import { StringFromNumberOrString } from "#common/string/stringFromNumberOrString.schema.js";

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
  identifier: "MonetaryAmount",
  title: "MonetaryAmount",
  description: "A monetary amount accepting a string or a number",
}).pipe(filter(hasValidMonetaryFormat), brand("MonetaryAmount"));
export type MonetaryAmount = Schema.Type<typeof MonetaryAmount>;

export const MonetaryAmountNonNegative = MonetaryAmount.annotations({
  identifier: "MonetaryAmountNonNegative",
  title: "MonetaryAmountNonNegative",
  description: "A monetary amount accepting a string or a number",
}).pipe(
  filter((value) => !isNegative(value)),
  brand("MonetaryAmountNonNegative"),
);
export type MonetaryAmountNonNegative = Schema.Type<
  typeof MonetaryAmountNonNegative
>;

export const MonetaryAmountAsCents = Int.annotations({
  identifier: "MonetaryAmountAsCents",
  title: "MonetaryAmountAsCents",
  description: "A monetary amount in cents",
}).pipe(brand("MonetaryAmountAsCents"));
export type MonetaryAmountAsCents = Schema.Type<typeof MonetaryAmountAsCents>;
