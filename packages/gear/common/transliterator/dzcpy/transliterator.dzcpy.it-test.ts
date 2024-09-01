import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { Transliterator } from "../transliterator.js";
import { TransliteratorDzcpy } from "./transliterator.dzcpy.js";

describe("transliterator - dzcpy", () => {
  const deps = TransliteratorDzcpy;

  it.effect("should slugify a string", () =>
    Effect.gen(function* () {
      const transliterator = yield* Transliterator;

      const slugifiedString = yield* transliterator.slugify("foo bar");

      expect(slugifiedString).toEqual("foo-bar");
    }).pipe(Effect.provide(deps)),
  );
});
