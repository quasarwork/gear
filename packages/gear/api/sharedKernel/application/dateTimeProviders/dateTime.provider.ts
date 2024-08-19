import { DateTimeProviderError } from "api/sharedKernel/application/dateTimeProviders/dateTime.provider.error";
import { Context, Effect } from "effect";

import type { SafeDate } from "#progLangExtensions/ts/effect/schemas/date/safeDate.schema";

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
