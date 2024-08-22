import { Context, Effect } from "effect";

import type { SafeDate } from "#common/schemas/date/safeDate.schema.js";
import { DateTimeProviderError } from "#server/sharedKernel/dateTimeProviders/dateTime.provider.error.js";

export interface DateTimeProvider {
  readonly now: () => Effect.Effect<SafeDate, DateTimeProviderError>;
  readonly tomorrow: () => Effect.Effect<SafeDate, DateTimeProviderError>;
  readonly yesterday: () => Effect.Effect<SafeDate, DateTimeProviderError>;
  readonly daysFromNow: (
    days: number,
  ) => Effect.Effect<SafeDate, DateTimeProviderError>;
  readonly daysAgo: (
    days: number,
  ) => Effect.Effect<SafeDate, DateTimeProviderError>;
}

export const DateTimeProvider = Context.GenericTag<DateTimeProvider>(
  "@quasarwork/gear/sharedKernel/DateTimeProvider",
);
