import { Data } from "effect";

import type { ErrorBaseProps } from "../errors/errorBase.js";

export class TransliteratorError extends Data.TaggedError(
  "TRANSLITERATOR_ERROR",
)<ErrorBaseProps> {}
