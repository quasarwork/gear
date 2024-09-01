import { PACKAGE_NAME } from "configs/package.constants.js";
import { Context, Effect } from "effect";

import type { BigIntId } from "#common/ids/bigIntId/bigIntId.schema.js";

import { BigIntIdGeneratorError } from "./bigIntId.generator.error.js";

export interface BigIntIdGenerator {
  readonly next: () => Effect.Effect<BigIntId, BigIntIdGeneratorError>;
  readonly nextRange: (
    range: number,
  ) => Effect.Effect<readonly BigIntId[], BigIntIdGeneratorError>;
}

export const BigIntIdGenerator = Context.GenericTag<BigIntIdGenerator>(
  `${PACKAGE_NAME}/common/BigIntIdGenerator`,
);
