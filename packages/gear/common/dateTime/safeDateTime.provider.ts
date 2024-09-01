import { Context, Effect } from "effect";

import { SafeDateTimeProviderError } from "#common/dateTime/safeDateTime.provider.error.js";
import type { SafeDateTime } from "#common/dateTime/safeDateTime.schema.js";
import { PACKAGE_NAME } from "#common/package.constants.js";

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
