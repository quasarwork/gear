import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { AbsoluteUrl } from "./absoluteUrl.schema.js";

describe("absolute url schema", () => {
  it.effect("should accept absolute urls", () =>
    Effect.gen(function* () {
      const someValidUrl = "https://www.google.com";

      const result = yield* decode(AbsoluteUrl)(someValidUrl);

      expect(result).toBe(someValidUrl);
    }),
  );

  it.effect("should reject invalid urls", () =>
    Effect.gen(function* () {
      const someInvalidUrl = "www.google.com";

      const result = yield* Effect.flip(decode(AbsoluteUrl)(someInvalidUrl));

      expect(result).toBeInstanceOf(Error);
    }),
  );
});
