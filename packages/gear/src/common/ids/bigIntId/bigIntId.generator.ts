import { Context, Effect } from "effect";

import { PACKAGE_NAME } from "../../package.constants.js";
import { BigIntIdGeneratorError } from "./bigIntId.generator.error.js";
import { BigIntId } from "./bigIntId.schema.js";

export interface BigIntIdGenerator {
  readonly next: () => Effect.Effect<BigIntId, BigIntIdGeneratorError>;
  readonly nextRange: (
    range: number,
  ) => Effect.Effect<readonly BigIntId[], BigIntIdGeneratorError>;
}

export const BigIntIdGenerator = Context.GenericTag<BigIntIdGenerator>(
  `${PACKAGE_NAME}/common/BigIntIdGenerator`,
);
