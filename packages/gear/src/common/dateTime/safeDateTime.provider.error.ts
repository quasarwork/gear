import { Data } from "effect";

import type { ErrorBaseProps } from "../errors/errorBase.js";

export class SafeDateTimeProviderError extends Data.TaggedError(
  "SafeDateTimeProviderError",
)<ErrorBaseProps> {}
