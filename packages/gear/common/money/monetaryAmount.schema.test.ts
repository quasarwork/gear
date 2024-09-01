import { decode, decodeUnknown } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  MonetaryAmount,
  MonetaryAmountAsCents,
  MonetaryAmountNonNegative,
} from "./monetaryAmount.schema.js";

describe("monetary amount schema", () => {
  describe("should accept valid monetary amounts", () => {
    it.effect("should accept a monetary amount", () =>
      Effect.gen(function* () {
        const someValidMonetaryAmount = "10.00";

        const result = yield* decode(MonetaryAmount)(someValidMonetaryAmount);

        expect(result).toStrictEqual(someValidMonetaryAmount);
      }),
    );

    it.effect("should accept a monetary amount with decimals", () =>
      Effect.gen(function* () {
        const someValidMonetaryAmount = "100.50";

        const result = yield* decode(MonetaryAmount)(someValidMonetaryAmount);

        expect(result).toBe(someValidMonetaryAmount);
      }),
    );
  });

  describe("should reject invalid monetary amounts", () => {
    it.effect("should reject a monetary amount without decimals", () =>
      Effect.gen(function* () {
        const someInvalidMonetaryAmount = "100";

        const result = yield* Effect.flip(
          decode(MonetaryAmount)(someInvalidMonetaryAmount),
        );

        expect(result).toBeInstanceOf(Error);
      }),
    );
  });
});

describe("monetary amount non negative schema", () => {
  describe("should accept valid monetary amounts", () => {
    it.effect("should accept a monetary amount", () =>
      Effect.gen(function* () {
        const someValidMonetaryAmount = "100.00";

        const result = yield* decode(MonetaryAmountNonNegative)(
          someValidMonetaryAmount,
        );

        expect(result).toBe(someValidMonetaryAmount);
      }),
    );

    it.effect("should accept a monetary amount with decimals", () =>
      Effect.gen(function* () {
        const someValidMonetaryAmount = "100.50";

        const result = yield* decode(MonetaryAmountNonNegative)(
          someValidMonetaryAmount,
        );

        expect(result).toBe(someValidMonetaryAmount);
      }),
    );
  });

  describe("should reject invalid monetary amounts", () => {
    it.effect("should reject a monetary amount with a negative value", () =>
      Effect.gen(function* () {
        const someInvalidMonetaryAmount = "-100.00";

        const result = yield* Effect.flip(
          decode(MonetaryAmountNonNegative)(someInvalidMonetaryAmount),
        );

        expect(result).toBeInstanceOf(Error);
      }),
    );
  });
});
describe("monetary amount as cents schema", () => {
  describe("should accept valid monetary amounts", () => {
    it.effect("should accept a monetary amount", () =>
      Effect.gen(function* () {
        const someValidMonetaryAmount = 100;

        const result = yield* decode(MonetaryAmountAsCents)(
          someValidMonetaryAmount,
        );

        expect(result).toBe(someValidMonetaryAmount);
      }),
    );
  });

  describe("should reject invalid monetary amounts", () => {
    it.effect("should reject a monetary amount with a non-integer value", () =>
      Effect.gen(function* () {
        const someInvalidMonetaryAmount = 100.5;

        const result = yield* Effect.flip(
          decodeUnknown(MonetaryAmountAsCents)(someInvalidMonetaryAmount),
        );

        expect(result).toBeInstanceOf(Error);
      }),
    );
  });
});
