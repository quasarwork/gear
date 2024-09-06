import { Effect, Layer } from "effect";

import { TransliteratorError } from "../transliterator.error.js";
import { Transliterator } from "../transliterator.js";

export const TransliteratorDeterministic = () => {
  let inMemorySlugifications = new Map<string, string>();

  const inMemorySlugificationsFeedWith = (
    slugifications: Map<string, string>,
  ) => {
    inMemorySlugifications = new Map(slugifications);
  };

  const inMemorySlugificationsFlush = () => {
    inMemorySlugifications.clear();
  };

  const layer = Layer.succeed(
    Transliterator,
    Transliterator.of({
      slugify: (text) =>
        Effect.try({
          try: () => {
            const slugification = inMemorySlugifications.get(text);

            if (!slugification) {
              throw new Error();
            }

            inMemorySlugifications.delete(slugification);

            return slugification;
          },
          catch: () =>
            new TransliteratorError({
              message: "No more slugifications available in the in-memory set.",
            }),
        }),
    }),
  );

  return { layer, inMemorySlugificationsFeedWith, inMemorySlugificationsFlush };
};
