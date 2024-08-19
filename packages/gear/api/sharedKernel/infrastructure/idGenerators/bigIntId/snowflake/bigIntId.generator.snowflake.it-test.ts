import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { BigIntIdGenerator } from "#server/sharedKernel/application/idGenerators/bigIntId.generator";
import { IdGenerationError } from "#server/sharedKernel/application/idGenerators/idGeneration.error";
import { BigIntIdGeneratorSnowflake } from "#server/sharedKernel/infrastructure/idGenerators/bigIntId/snowflake/bigIntId.generator.snowflake";

describe("bigint id generator - snowflake", () => {
  const deps = BigIntIdGeneratorSnowflake;

  const isBigIntId = (id: string): boolean => {
    return (
      !String(id).startsWith("0") &&
      !Number.isNaN(Number(id)) &&
      Number(id) % 1 === 0 &&
      Number(id) > 0
    );
  };

  describe("next", () => {
    it.effect("should generate a new bigint id", () =>
      Effect.gen(function* () {
        const generator = yield* BigIntIdGenerator;

        const id = yield* generator.next();

        expect(isBigIntId(id)).toBe(true);
      }).pipe(Effect.provide(deps)),
    );

    it("should fail with ID_GENERATION_ERROR if the generator fails to generate a new bigint id", () =>
      Effect.gen(function* () {
        const generator = yield* BigIntIdGenerator;

        const result = yield* Effect.flip(generator.next());

        expect(result).toBeInstanceOf(IdGenerationError);
        expect(result.message).toBe("Failed to generate next bigint id");
      }).pipe(Effect.provide(deps)));
  });

  describe("next range", () => {
    it.effect("should generate a new range of bigint ids", () =>
      Effect.gen(function* () {
        const generator = yield* BigIntIdGenerator;

        const ids = yield* generator.nextRange(10);

        expect(ids).toBeInstanceOf(Array);
        expect(ids.length).toBe(10);

        ids.forEach((id) => {
          expect(isBigIntId(id)).toBe(true);
        });
      }).pipe(Effect.provide(deps)),
    );

    it("should fail with ID_GENERATION_ERROR if the generator fails to generate at least one of the bigint ids", () =>
      Effect.gen(function* () {
        const generator = yield* BigIntIdGenerator;

        const result = yield* Effect.flip(generator.nextRange(10));

        expect(result).toBeInstanceOf(IdGenerationError);
        expect(result.message).toBe(
          "Failed to generate next range of bigint ids",
        );
      }).pipe(Effect.provide(deps)));
  });
});
