import { SnowflakeId } from "@akashrajpurohit/snowflake-id";
import { Effect, Layer } from "effect";

import { errorEnsure } from "../../../errors/error.fns.js";
import { BigIntIdGeneratorError } from "../bigIntId.generator.error.js";
import { BigIntIdGenerator } from "../bigIntId.generator.js";
import { BigIntId } from "../bigIntId.schema.js";

export const BigIntIdGeneratorSnowflake = Layer.succeed(
  BigIntIdGenerator,
  BigIntIdGenerator.of({
    next: () =>
      Effect.try({
        catch: (unknown) =>
          BigIntIdGeneratorError.fromUnknown(unknown, {
            message: "Failed to generate next bigint id.",
          }),
        try: () => {
          const snowflake = SnowflakeId();

          const nextId = snowflake.generate();

          return BigIntId.make(nextId);
        },
      }),
    nextRange: (range) =>
      Effect.try({
        catch: (unknown) =>
          new BigIntIdGeneratorError({
            cause: errorEnsure(unknown),
            message: "Failed to generate next range of bigint ids.",
          }),
        try: () => {
          const snowflake = SnowflakeId();

          const ids = Array.from({ length: range }, () => snowflake.generate());

          return ids.map((id) => BigIntId.make(id));
        },
      }),
  }),
);
