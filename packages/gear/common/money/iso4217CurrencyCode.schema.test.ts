import { decode, decodeUnknown } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  ISO4217CurrencyCode,
  ISO4217CurrencyCodes,
} from "./iso4217CurrencyCode.schema.js";

describe("ISO 4217 currency code schema", () => {
  describe("should accept valid currency codes", () => {
    ISO4217CurrencyCodes.forEach((currencyCode) => {
      it.effect(`should accept ${currencyCode}`, () =>
        Effect.gen(function* () {
          const result = yield* decode(ISO4217CurrencyCode)(currencyCode);

          expect(result).toBe(currencyCode);
        }),
      );
    });
  });

  it.effect("should reject invalid currency codes", () =>
    Effect.gen(function* () {
      const someInvalidCurrencyCode = "EU";

      const result = yield* Effect.flip(
        decodeUnknown(ISO4217CurrencyCode)(someInvalidCurrencyCode),
      );

      expect(result).toBeInstanceOf(Error);
    }),
  );
});
