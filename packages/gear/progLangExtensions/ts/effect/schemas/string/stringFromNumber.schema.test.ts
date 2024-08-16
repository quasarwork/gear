import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { StringFromNumber } from "./stringFromNumber.schema";

describe("string from number schema", () => {
  it.effect("should accept strings or numbers and return a string", () =>
    Effect.gen(function* () {
      const someString = "1234";
      const someNumber = 1234;

      const someStringResult = yield* decode(StringFromNumber)(someString);
      const someNumberResult = yield* decode(StringFromNumber)(someNumber);

      expect(someStringResult).toBe(someString);
      expect(someNumberResult).toBe(someString);
    }),
  );
});
