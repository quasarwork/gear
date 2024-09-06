import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { MyshopifyDomain } from "./myshopifyDomain.schema.js";

describe("myshopify domain schema", () => {
  it.effect("should accept valid myshopify.com domains", () =>
    Effect.gen(function* () {
      const someValidDomain = "super-store.myshopify.com";

      const result = yield* decode(MyshopifyDomain)(someValidDomain);

      expect(result).toBe(someValidDomain);
    }),
  );

  it.effect("should reject invalid myshopify.com domains", () =>
    Effect.gen(function* () {
      const someInvalidDomain = "super-store.com";

      const result = yield* Effect.flip(
        decode(MyshopifyDomain)(someInvalidDomain),
      );

      expect(result).toBeInstanceOf(Error);
    }),
  );

  it.effect("should reject domains with a protocol", () =>
    Effect.gen(function* () {
      const someInvalidDomain = "https://super-store.myshopify.com";

      const result = yield* Effect.flip(
        decode(MyshopifyDomain)(someInvalidDomain),
      );

      expect(result).toBeInstanceOf(Error);
    }),
  );

  it.effect("should reject domains with a subdomain", () =>
    Effect.gen(function* () {
      const someInvalidDomain = "www.super-store.myshopify.com";

      const result = yield* Effect.flip(
        decode(MyshopifyDomain)(someInvalidDomain),
      );

      expect(result).toBeInstanceOf(Error);
    }),
  );
});
