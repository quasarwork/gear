import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { SafeDateTime } from "#common/dateTime/safeDateTime.schema.js";

describe("safe date schema", () => {
  it.effect("should accept valid dates from dates and return a date", () =>
    Effect.gen(function* () {
      const someValidDate = new Date();

      const result = yield* decode(SafeDateTime)(someValidDate);

      expect(result).toBe(someValidDate);
      expect(result).toBeInstanceOf(Date);
    }),
  );

  it.effect("should accept valid dates from strings", () =>
    Effect.gen(function* () {
      const someValidDateFromString = "2023-01-01";

      const result = yield* decode(SafeDateTime)(someValidDateFromString);

      expect(result.toISOString()).toBe("2023-01-01T00:00:00.000Z");
      expect(result).toBeInstanceOf(Date);
    }),
  );
});
