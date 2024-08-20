import { Context, Effect } from "effect";

import type { BigIntId } from "#progLangExtensions/ts/effect/schemas/ids/bigIntId.schema";
import { BigIntIdGeneratorError } from "#server/sharedKernel/application/idGenerators/bigIntId.generator.error";

export interface BigIntIdGenerator {
  readonly next: () => Effect.Effect<BigIntId, BigIntIdGeneratorError>;
  readonly nextRange: (
    range: number,
  ) => Effect.Effect<readonly BigIntId[], BigIntIdGeneratorError>;
}

export const BigIntIdGenerator = Context.GenericTag<BigIntIdGenerator>(
  "@quasarwork/gear/sharedKernel/BigIntIdGenerator",
);
