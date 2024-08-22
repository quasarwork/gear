import { Context, Effect } from "effect";

import type { BigIntId } from "#common/schemas/ids/bigIntId.schema.js";
import { BigIntIdGeneratorError } from "#server/sharedKernel/idGenerators/bigIntId/bigIntId.generator.error.js";

export interface BigIntIdGenerator {
  readonly next: () => Effect.Effect<BigIntId, BigIntIdGeneratorError>;
  readonly nextRange: (
    range: number,
  ) => Effect.Effect<readonly BigIntId[], BigIntIdGeneratorError>;
}

export const BigIntIdGenerator = Context.GenericTag<BigIntIdGenerator>(
  "@quasarwork/gear/sharedKernel/BigIntIdGenerator",
);
