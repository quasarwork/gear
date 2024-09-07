import { decodeUnknownSync } from "@effect/schema/ParseResult";
import { Effect, Layer } from "effect";

import { BigIntIdGeneratorError } from "../bigIntId.generator.error.js";
import { BigIntIdGenerator } from "../bigIntId.generator.js";
import { BigIntId } from "../bigIntId.schema.js";

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
          catch: () =>
            new BigIntIdGeneratorError({
              message: "No more bigint ids available in the in-memory set.",
            }),
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
        }),
      nextRange: (range) =>
        Effect.try({
          catch: () =>
            new BigIntIdGeneratorError({
              message: "Not enough bigint ids available in the in-memory set.",
            }),
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
        }),
    }),
  );

  return { idsFlush, idsSetNext, layer };
};
