import { decodeUnknownSync } from "@effect/schema/ParseResult";
import { Effect, Layer } from "effect";

import { BigIntId } from "#progLangExtensions/ts/effect/schemas/ids/bigIntId.schema";
import { BigIntIdGenerator } from "#server/sharedKernel/application/idGenerators/bigIntId.generator";
import { IdGenerationError } from "#server/sharedKernel/application/idGenerators/idGeneration.error";

export const BigIntIdGeneratorDeterministic = () => {
  let inMemoryBigIntIds = new Set<BigIntId>();

  const idsSetNext = (ids: BigIntId[]) => {
    inMemoryBigIntIds = new Set(ids);
  };

  const idsFlush = () => {
    inMemoryBigIntIds.clear();
  };

  const layer = Layer.succeed(
    BigIntIdGenerator,
    BigIntIdGenerator.of({
      next: () =>
        Effect.try({
          try: () => {
            const nextId = decodeUnknownSync(BigIntId)(
              inMemoryBigIntIds.values().next().value,
            );

            if (!nextId) {
              throw new Error();
            }

            inMemoryBigIntIds.delete(nextId);

            return nextId;
          },
          catch: () =>
            new IdGenerationError({
              message: "No more bigint ids available in the in-memory set.",
            }),
        }),
      nextRange: (range) =>
        Effect.try({
          try: () => {
            const nextIds = Array.from(inMemoryBigIntIds.values()).slice(
              0,
              range,
            );
            nextIds.forEach((id) => inMemoryBigIntIds.delete(id));

            if (nextIds.length < range) {
              throw new Error();
            }

            return nextIds;
          },
          catch: () =>
            new IdGenerationError({
              message: "Not enough bigint ids available in the in-memory set.",
            }),
        }),
    }),
  );

  return { layer, idsSetNext, idsFlush };
};
