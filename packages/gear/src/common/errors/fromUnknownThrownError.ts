import { Data } from "effect";

import { ErrorBaseProps } from "./errorBase.js";

export class FromUnknownThrownError extends Data.TaggedError(
  "FROM_UNKNOWN_THROWN_ERROR",
)<ErrorBaseProps> {}
