import { Effect, Layer } from "effect";
import { slugify as trSlugify } from "transliteration";

import { TransliteratorError } from "../transliterator.error.js";
import { Transliterator } from "../transliterator.js";

export const TransliteratorDzcpy = Layer.succeed(
  Transliterator,
  Transliterator.of({
    slugify: (text) =>
      Effect.try({
        catch: (unknown) =>
          TransliteratorError.fromUnknown(unknown, {
            message: "Slugification failed.",
            metadata: {
              input: text,
            },
          }),
        try: () => trSlugify(text),
      }),
  }),
);
