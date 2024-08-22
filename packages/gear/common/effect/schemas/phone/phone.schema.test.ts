import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { Phone } from "./phone.schema.js";

describe("phone schema", () => {
  it.effect("should accept valid phone numbers", () =>
    Effect.gen(function* () {
      const someValidPhoneWithPlus = "+33666666666";
      const someValidPhoneWithoutPlus = "03666666666";

      const someValidPhoneWithPlusResult = yield* decode(Phone)(
        someValidPhoneWithPlus,
      );
      const someValidPhoneWithoutPlusResult = yield* decode(Phone)(
        someValidPhoneWithoutPlus,
      );

      expect(someValidPhoneWithPlusResult).toBe(someValidPhoneWithPlus);
      expect(someValidPhoneWithoutPlusResult).toBe(someValidPhoneWithoutPlus);
    }),
  );

  it.effect("should reject invalid phone numbers", () =>
    Effect.gen(function* () {
      const someInvalidPhone = "-33+123456789";

      const result = yield* Effect.flip(decode(Phone)(someInvalidPhone));

      expect(result).toBeInstanceOf(ParseError);
    }),
  );
});
