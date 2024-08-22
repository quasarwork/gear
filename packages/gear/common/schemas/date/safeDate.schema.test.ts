import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { SafeDate } from "common/schemas/date/safeDate.schema.js";
import { Effect } from "effect";

describe("safe date schema", () => {
  it("should accept valid dates from dates and return a date", () =>
    Effect.gen(function* () {
      const someValidDate = new Date();

      const result = yield* decode(SafeDate)(someValidDate);

      expect(result).toBe(someValidDate);
      expect(result).toBeInstanceOf(Date);
    }));

  it("should accept valid dates from strings", () =>
    Effect.gen(function* () {
      const someValidDateFromString = "2023-01-01";

      const result = yield* decode(SafeDate)(someValidDateFromString);

      expect(result).toBe(someValidDateFromString);
      expect(result).toBeInstanceOf(Date);
    }));
});
