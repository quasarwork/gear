import { Effect, Layer } from "effect";
import { slugify as trSlugify } from "transliteration";

import { errorEnsure } from "../../errors/error.fns.js";
import { TransliteratorError } from "../transliterator.error.js";
import { Transliterator } from "../transliterator.js";

export const TransliteratorDzcpy = Layer.succeed(
  Transliterator,
  Transliterator.of({
    slugify: (text) =>
      Effect.try({
        catch: (unknown) =>
          new TransliteratorError({
            cause: errorEnsure(unknown),
            message: "Slugification failed.",
            metadata: {
              input: text,
            },
          }),
        try: () => trSlugify(text),
      }),
  }),
);
