import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { StringInRange1To2048 } from "#common/effect/schemas/string/stringInRange1To2048.schema.js";

describe("string in range 1-2048 schema", () => {
  it.effect("should accept strings within specified range", () =>
    Effect.gen(function* () {
      const someString = "1234";

      const result = yield* decode(StringInRange1To2048)(someString);

      expect(result).toBe(someString);
    }),
  );

  it.effect("should reject strings outside specified range", () =>
    Effect.gen(function* () {
      const tooShortString = "";
      const tooLongString = "a".repeat(2049);

      const tooShortStringResult = yield* Effect.flip(
        decode(StringInRange1To2048)(tooShortString),
      );
      const tooLongStringResult = yield* Effect.flip(
        decode(StringInRange1To2048)(tooLongString),
      );

      expect(tooShortStringResult).toBeInstanceOf(Error);
      expect(tooLongStringResult).toBeInstanceOf(Error);
    }),
  );
});
