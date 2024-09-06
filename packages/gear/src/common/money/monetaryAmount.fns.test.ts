import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  monetaryAmountFromCents,
  monetaryAmountToCents,
} from "./monetaryAmount.fns.js";
import {
  MonetaryAmount,
  MonetaryAmountAsCents,
} from "./monetaryAmount.schema.js";

describe("monetary amount to cents", () => {
  it.effect("should convert a monetary amount to cents", () =>
    Effect.gen(function* () {
      const someValidMonetaryAmount = MonetaryAmount.make("100.00");

      const result = yield* monetaryAmountToCents(someValidMonetaryAmount);

      expect(result).toBe(10000);
    }),
  );
});

describe("monetary amount from cents", () => {
  it.effect("should convert a monetary amount from cents", () =>
    Effect.gen(function* () {
      const someValidMonetaryAmount = MonetaryAmountAsCents.make(10000);

      const result = yield* monetaryAmountFromCents(someValidMonetaryAmount);

      expect(result).toBe("100.00");
    }),
  );
});
