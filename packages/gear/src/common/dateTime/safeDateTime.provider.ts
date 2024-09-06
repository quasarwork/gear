import { Context, Effect } from "effect";

import { PACKAGE_NAME } from "../package.constants.js";
import { SafeDateTimeProviderError } from "./safeDateTime.provider.error.js";
import { SafeDateTime } from "./safeDateTime.schema.js";

export interface SafeDateTimeProvider {
  readonly now: () => Effect.Effect<SafeDateTime, SafeDateTimeProviderError>;
  readonly tomorrow: () => Effect.Effect<
    SafeDateTime,
    SafeDateTimeProviderError
  >;
  readonly yesterday: () => Effect.Effect<
    SafeDateTime,
    SafeDateTimeProviderError
  >;
  readonly daysFromNow: (
    days: number,
  ) => Effect.Effect<SafeDateTime, SafeDateTimeProviderError>;
  readonly daysAgo: (
    days: number,
  ) => Effect.Effect<SafeDateTime, SafeDateTimeProviderError>;
}

export const SafeDateTimeProvider = Context.GenericTag<SafeDateTimeProvider>(
  `${PACKAGE_NAME}/common/SafeDateTimeProvider`,
);
