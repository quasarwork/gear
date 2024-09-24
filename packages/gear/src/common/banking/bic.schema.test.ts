import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { BIC_VALID_DEFAULT } from "./__testing__/fixtures.js";
import { BIC } from "./bic.schema.js";

describe("BIC schema", () => {
  it.effect("should accept valid BICs", () =>
    Effect.gen(function* () {
      const result = yield* decode(BIC)(BIC_VALID_DEFAULT);

      expect(result).toBe(BIC_VALID_DEFAULT);
    }),
  );

  it.effect("should reject invalid BICs", () =>
    Effect.gen(function* () {
      const tooShortBIC = BIC_VALID_DEFAULT.slice(0, 4);
      const tooLongBIC = BIC_VALID_DEFAULT + "123456789";

      const tooShortBICResult = yield* Effect.flip(decode(BIC)(tooShortBIC));
      const tooLongBICResult = yield* Effect.flip(decode(BIC)(tooLongBIC));

      expect(tooShortBICResult).toBeInstanceOf(ParseError);
      expect(tooLongBICResult).toBeInstanceOf(ParseError);
    }),
  );
});
