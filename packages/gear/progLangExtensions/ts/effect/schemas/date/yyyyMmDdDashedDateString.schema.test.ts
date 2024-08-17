// import { Schema, String, brand, filter } from "@effect/schema/Schema";
//
// const isValidYyyyMmDdDateString = (str: string): boolean =>
//   /^\d{4}\d{2}\d{2}$/.test(str);
//
// export const YyyyMmDdDateString = String.annotations({
//   title: "YyyyMmDdDateString",
//   description: "A date string in the format yyyymmdd",
// }).pipe(filter(isValidYyyyMmDdDateString), brand("YyyyMmDdDateString"));
// export type YyyyMmDdDateString = Schema.Type<typeof YyyyMmDdDateString>;
import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { YyyyMmDdDateString } from "./yyyyMmDdDashedDateString.schema";

describe("yyyyMmDdDashedDateString schema", () => {
  it("should accept valid dates as string with dashes", () =>
    Effect.gen(function* () {
      const someValidYyyyMmDdDashedDateString = "2023-01-01";

      const result = yield* decode(YyyyMmDdDateString)(
        someValidYyyyMmDdDashedDateString,
      );

      expect(result).toBe(someValidYyyyMmDdDashedDateString);
    }));

  it("should reject dates as string without dashes", () =>
    Effect.gen(function* () {
      const someInvalidDateFromString = "20230101";

      const result = yield* Effect.flip(
        decode(YyyyMmDdDateString)(someInvalidDateFromString),
      );

      expect(result).toBeInstanceOf(ParseError);
    }));
});
