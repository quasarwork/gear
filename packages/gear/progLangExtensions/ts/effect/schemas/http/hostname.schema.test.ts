import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { HostName } from "./hostname.schema.js";

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
