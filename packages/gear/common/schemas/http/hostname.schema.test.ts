import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { HostName } from "common/schemas/http/hostname.schema.js";
import { Effect } from "effect";

describe("hostname schema", () => {
  it.effect("should accept valid hostnames", () =>
    Effect.gen(function* () {
      const someValidHostname = "www.google.com";

      const result = yield* decode(HostName)(someValidHostname);

      expect(result).toBe(someValidHostname);
    }),
  );

  it.effect("should reject invalid hostnames", () =>
    Effect.gen(function* () {
      const someInvalidHostname = "https://www.google.com";

      const result = yield* Effect.flip(decode(HostName)(someInvalidHostname));

      expect(result).toBeInstanceOf(Error);
    }),
  );
});
