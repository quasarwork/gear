import { decode } from "@effect/schema/Schema";
import { Effect } from "effect";

import {
  MonetaryAmount,
  MonetaryAmountAsCents,
} from "#common/money/monetaryAmount.schema.js";

/**
 * @description Convert a monetary amount in cents to a monetary amount (number to string)
 *
 * @param amount
 *
 * @returns A monetary amount (string)
 *
 * @example
 * ```ts
 * monetaryAmountToCents("100.00") // returns "10000"
 * monetaryAmountToCents("100.50") // returns "10050"
 * ```
 */
export const monetaryAmountToCents = (amount: MonetaryAmount) =>
  Effect.gen(function* () {
    const amountAsNumber = parseFloat(amount);
    const amountAsCents = amountAsNumber * 100;

    return yield* decode(MonetaryAmountAsCents)(amountAsCents);
  });

/**
 * @description Convert a monetary amount in cents to a monetary amount (number to string)
 *
 * @param amount
 *
 * @returns A monetary amount (string)
 *
 * @example
 * ```ts
 * monetaryAmountFromCents("10000") // returns "100.00"
 * monetaryAmountFromCents("10050") // returns "100.50"
 * ```
 */
export const monetaryAmountFromCents = (amount: MonetaryAmountAsCents) =>
  Effect.gen(function* () {
    const amountAsNumber = (amount / 100).toFixed(2);

    return yield* decode(MonetaryAmount)(amountAsNumber);
  });
