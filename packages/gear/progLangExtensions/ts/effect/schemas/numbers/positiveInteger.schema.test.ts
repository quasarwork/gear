import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { PositiveInteger } from "./positiveInteger.schema";

describe("positive integer schema", () => {
  it("should accept valid positive integers", () =>
    Effect.gen(function* () {
      const someValidPositiveInteger = 1;

      const result = yield* decode(PositiveInteger)(someValidPositiveInteger);

      expect(result).toBe(someValidPositiveInteger);
    }));

  it("should reject negative integers", () =>
    Effect.gen(function* () {
      const someInvalidNegativeInteger = -1;

      const result = yield* Effect.flip(
        decode(PositiveInteger)(someInvalidNegativeInteger),
      );

      expect(result).toBeInstanceOf(Error);
    }));

  it("should reject non-integers", () =>
    Effect.gen(function* () {
      const someInvalidNonInteger = 1.5;

      const result = yield* Effect.flip(
        decode(PositiveInteger)(someInvalidNonInteger),
      );

      expect(result).toBeInstanceOf(Error);
    }));
});
