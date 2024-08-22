import { Effect, Layer } from "effect";

import { errorEnsure } from "#common/errors/error.fns.js";
import type { SafeDate } from "#common/schemas/date/safeDate.schema.js";
import { DateTimeProviderError } from "#server/sharedKernel/dateTimeProviders/dateTime.provider.error.js";
import { DateTimeProvider } from "#server/sharedKernel/dateTimeProviders/dateTime.provider.js";

export const DateTimeProviderDeterministic = () => {
  let inMemoryDateOfNow: SafeDate;

  let inMemoryDateOfTomorrow: SafeDate;
  let inMemoryDateOfYesterday: SafeDate;

  const inMemoryDatesDaysFromNow = new Map<number, SafeDate>();
  const inMemoryDatesDaysAgo = new Map<number, SafeDate>();

  const datesDaysFromNowSetNext = (days: number, date: SafeDate) => {
    inMemoryDatesDaysFromNow.set(days, date);
  };
  const datesDaysFromNowFlush = () => {
    inMemoryDatesDaysFromNow.clear();
  };

  const datesDaysAgoSetNext = (days: number, date: SafeDate) => {
    inMemoryDatesDaysAgo.set(days, date);
  };
  const datesDaysAgoFlush = () => {
    inMemoryDatesDaysAgo.clear();
  };

  const layer = Layer.succeed(
    DateTimeProvider,
    DateTimeProvider.of({
      now: () =>
        Effect.try({
          try: () => inMemoryDateOfNow,
          catch: (unknown) =>
            DateTimeProviderError.fromUnknown(unknown, {
              message: "Date of now providing failed.",
            }),
        }),
      tomorrow: () =>
        Effect.try({
          try: () => inMemoryDateOfTomorrow,
          catch: (unknown) =>
            new DateTimeProviderError({
              message: "Date of tomorrow providing failed.",
              cause: errorEnsure(unknown),
            }),
        }),
      yesterday: () =>
        Effect.try({
          try: () => inMemoryDateOfYesterday,
          catch: (unknown) =>
            new DateTimeProviderError({
              message: "Date of yesterday providing failed.",
              cause: errorEnsure(unknown),
            }),
        }),
      daysFromNow: (days) =>
        Effect.try({
          try: () => {
            const date = inMemoryDatesDaysFromNow.get(days);

            if (!date) {
              throw new Error(
                `Date of ${String(days)} from now has not been defined in the in-memory map.`,
              );
            }

            return date;
          },
          catch: (unknown) =>
            new DateTimeProviderError({
              message: `Date of ${String(days)} from now providing failed.`,
              cause: errorEnsure(unknown),
            }),
        }),
      daysAgo: (days) =>
        Effect.try({
          try: () => {
            const date = inMemoryDatesDaysAgo.get(days);

            if (!date) {
              throw new Error(
                `Date of ${String(days)} days ago has not been defined in the in-memory map.`,
              );
            }

            return date;
          },
          catch: (unknown) =>
            new DateTimeProviderError({
              message: `Date of ${String(days)} days ago providing failed.`,
              cause: errorEnsure(unknown),
            }),
        }),
    }),
  );

  return {
    layer,
    datesDaysFromNowSetNext,
    datesDaysFromNowFlush,
    datesDaysAgoSetNext,
    datesDaysAgoFlush,
  };
};
