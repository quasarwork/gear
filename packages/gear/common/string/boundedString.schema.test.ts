import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { BoundedString } from "#common/string/boundedString.schema.js";

describe("bounded string schema", () => {
  it.effect("should accept strings within specified range", () =>
    Effect.gen(function* () {
      const stringThatShouldBeAccepted = "1234";

      const result = yield* decode(BoundedString(1, 5))(
        stringThatShouldBeAccepted,
      );

      expect(result).toBe(stringThatShouldBeAccepted);
    }),
  );

  it.effect("should reject strings outside specified range", () =>
    Effect.gen(function* () {
      const tooShortString = "";
      const tooLongString = "123456";

      const tooShortStringResult = yield* Effect.flip(
        decode(BoundedString(1, 5))(tooShortString),
      );
      const tooLongStringResult = yield* Effect.flip(
        decode(BoundedString(1, 5))(tooLongString),
      );

      expect(tooShortStringResult).toBeInstanceOf(ParseError);
      expect(tooLongStringResult).toBeInstanceOf(ParseError);
    }),
  );
});
