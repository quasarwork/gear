import { SnowflakeId } from "@akashrajpurohit/snowflake-id";
import { Effect, Layer } from "effect";

import { BigIntId } from "#progLangExtensions/ts/effect/schemas/ids/bigIntId.schema";
import { errorEnsure } from "#progLangExtensions/ts/errors/error.fns";
import { BigIntIdGenerator } from "#server/sharedKernel/application/idGenerators/bigIntId.generator";
import { BigIntIdGeneratorError } from "#server/sharedKernel/application/idGenerators/bigIntId.generator.error";

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
          new BigIntIdGeneratorError({
            message: "Failed to generate next bigint id.",
            cause: errorEnsure(unknown),
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
