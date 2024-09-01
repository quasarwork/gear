import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { IBAN } from "./iban.schema.js";

describe("IBAN schema", () => {
  it.effect("should accept valid IBANs", () =>
    Effect.gen(function* () {
      const someIBAN = "FR76300010079412345678901";

      const result = yield* decode(IBAN)(someIBAN);

      expect(result).toBe(someIBAN);
    }),
  );

  it.effect("should reject invalid IBANs", () =>
    Effect.gen(function* () {
      const tooShortIBAN = "FR763000";
      const tooLongIBAN = "FR763000100794123456789012345678925645645";

      const tooShortIBANResult = yield* Effect.flip(decode(IBAN)(tooShortIBAN));
      const tooLongIBANResult = yield* Effect.flip(decode(IBAN)(tooLongIBAN));

      expect(tooShortIBANResult).toBeInstanceOf(ParseError);
      expect(tooLongIBANResult).toBeInstanceOf(ParseError);
    }),
  );
});
