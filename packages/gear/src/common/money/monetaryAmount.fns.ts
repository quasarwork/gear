import { decode } from "@effect/schema/Schema";
import { Effect } from "effect";

import {
  MonetaryAmount,
  MonetaryAmountAsCents,
} from "./monetaryAmount.schema.js";

/**
 * Convert a monetary amount in cents to a monetary amount (number to string)
 *
 * @example
 *
 * ```ts
 * monetaryAmountToCents("100.00"); // returns "10000"
 * monetaryAmountToCents("100.50"); // returns "10050"
 * ```
 *
 * @param amount
 *
 * @returns A monetary amount (string)
 */
export const monetaryAmountToCents = (amount: MonetaryAmount) =>
  Effect.gen(function* () {
    const amountAsNumber = parseFloat(amount);
    const amountAsCents = amountAsNumber * 100;

    return yield* decode(MonetaryAmountAsCents)(amountAsCents);
  });

/**
 * Convert a monetary amount in cents to a monetary amount (number to string)
 *
 * @example
 *
 * ```ts
 * monetaryAmountFromCents("10000"); // returns "100.00"
 * monetaryAmountFromCents("10050"); // returns "100.50"
 * ```
 *
 * @param amount
 *
 * @returns A monetary amount (string)
 */
export const monetaryAmountFromCents = (amount: MonetaryAmountAsCents) =>
  Effect.gen(function* () {
    const amountAsNumber = (amount / 100).toFixed(2);

    return yield* decode(MonetaryAmount)(amountAsNumber);
  });
