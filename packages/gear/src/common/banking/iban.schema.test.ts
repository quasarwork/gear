import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { IBAN_VALID_DEFAULT } from "./__testing__/fixtures.js";
import { IBAN } from "./iban.schema.js";

describe("IBAN schema", () => {
  it.effect("should accept valid IBANs", () =>
    Effect.gen(function* () {
      const result = yield* decode(IBAN)(IBAN_VALID_DEFAULT);

      expect(result).toBe(IBAN_VALID_DEFAULT);
    }),
  );

  describe("should reject invalid IBANs", () => {
    it.effect("should reject IBAN when length is not valid", () =>
      Effect.gen(function* () {
        const result = yield* Effect.flip(
          decode(IBAN)(IBAN_VALID_DEFAULT + "12345678901234567890"),
        );

        expect(result).toBeInstanceOf(ParseError);
      }),
    );
  });
});
