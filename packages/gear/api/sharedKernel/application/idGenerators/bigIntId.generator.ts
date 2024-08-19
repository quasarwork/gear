import { Context, Effect } from "effect";

import type { BigIntId } from "#progLangExtensions/ts/effect/schemas/ids/bigIntId.schema";

import { IdGenerationError } from "./idGeneration.error";

export interface BigIntIdGenerator {
  readonly next: () => Effect.Effect<BigIntId, IdGenerationError>;
  readonly nextRange: (
    range: number,
  ) => Effect.Effect<readonly BigIntId[], IdGenerationError>;
}

export const BigIntIdGenerator = Context.GenericTag<BigIntIdGenerator>(
  "@quasarwork/gear/sharedKernel/BigIntIdGenerator",
);
