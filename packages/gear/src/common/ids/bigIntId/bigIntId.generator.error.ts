import { Data } from "effect";

import type { ErrorBaseProps } from "../../errors/errorBase.js";

export class BigIntIdGeneratorError extends Data.TaggedError(
  "BigIntIdGeneratorError",
)<ErrorBaseProps> {}
