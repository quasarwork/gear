import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { BIC } from "./bic.schema.js";

describe("BIC schema", () => {
  it.effect("should accept valid BICs", () =>
    Effect.gen(function* () {
      const someBIC = "AXABFRPP";

      const result = yield* decode(BIC)(someBIC);

      expect(result).toBe(someBIC);
    }),
  );

  it.effect("should reject invalid BICs", () =>
    Effect.gen(function* () {
      const tooShortBIC = "AXABFR";
      const tooLongBIC = "BIC1234567890";

      const tooShortBICResult = yield* Effect.flip(decode(BIC)(tooShortBIC));
      const tooLongBICResult = yield* Effect.flip(decode(BIC)(tooLongBIC));

      expect(tooShortBICResult).toBeInstanceOf(ParseError);
      expect(tooLongBICResult).toBeInstanceOf(ParseError);
    }),
  );
});
