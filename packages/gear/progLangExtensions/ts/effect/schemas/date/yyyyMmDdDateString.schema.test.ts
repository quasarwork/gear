import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { YyyyMmDdDateString } from "./yyyyMmDdDashedDateString.schema";

describe("yyyyMmDdDateString schema", () => {
  it("should accept valid dates as string", () =>
    Effect.gen(function* () {
      const someValidYyyyMmDdDateString = "20230101";

      const result = yield* decode(YyyyMmDdDateString)(
        someValidYyyyMmDdDateString,
      );

      expect(result).toBe(someValidYyyyMmDdDateString);
    }));

  it("should reject dates as string with dashes", () =>
    Effect.gen(function* () {
      const someInvalidDateFromString = "2023-01-01";

      const result = yield* Effect.flip(
        decode(YyyyMmDdDateString)(someInvalidDateFromString),
      );

      expect(result).toBeInstanceOf(ParseError);
    }));
});
