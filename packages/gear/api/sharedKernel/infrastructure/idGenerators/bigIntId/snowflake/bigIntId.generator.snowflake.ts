import { SnowflakeId } from "@akashrajpurohit/snowflake-id";
import { Effect, Layer } from "effect";

import { BigIntId } from "#common/effect/schemas/ids/bigIntId.schema.js";
import { errorEnsure } from "#common/errors/error.fns.js";
import { BigIntIdGeneratorError } from "#server/sharedKernel/application/idGenerators/bigIntId.generator.error.js";
import { BigIntIdGenerator } from "#server/sharedKernel/application/idGenerators/bigIntId.generator.js";

export const BigIntIdGeneratorSnowflake = Layer.succeed(
  BigIntIdGenerator,
  BigIntIdGenerator.of({
    next: () =>
      Effect.try({
        try: () => {
          const snowflake = SnowflakeId();

          const nextId = snowflake.generate();

          return BigIntId.make(nextId);
        },
        catch: (unknown) =>
          BigIntIdGeneratorError.fromUnknown(unknown, {
            message: "Failed to generate next bigint id.",
          }),
      }),
    nextRange: (range) =>
      Effect.try({
        try: () => {
          const snowflake = SnowflakeId();

          const ids = Array.from({ length: range }, () => snowflake.generate());

          return ids.map((id) => BigIntId.make(id));
        },
        catch: (unknown) =>
          new BigIntIdGeneratorError({
            message: "Failed to generate next range of bigint ids.",
            cause: errorEnsure(unknown),
          }),
      }),
  }),
);
