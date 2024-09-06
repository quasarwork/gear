import { Effect, Layer } from "effect";

import { errorEnsure } from "../../errors/index.js";
import { SafeDateTimeProviderError } from "../safeDateTime.provider.error.js";
import { SafeDateTimeProvider } from "../safeDateTime.provider.js";
import { SafeDateTime } from "../safeDateTime.schema.js";

export const SafeDateTimeProviderDeterministic = () => {
  let inMemoryDateOfNow: SafeDateTime;

  let inMemoryDateOfTomorrow: SafeDateTime;
  let inMemoryDateOfYesterday: SafeDateTime;

  const inMemoryDatesDaysFromNow = new Map<number, SafeDateTime>();
  const inMemoryDatesDaysAgo = new Map<number, SafeDateTime>();

  const datesDaysFromNowSetNext = (days: number, date: SafeDateTime) => {
    inMemoryDatesDaysFromNow.set(days, date);
  };
  const datesDaysFromNowFlush = () => {
    inMemoryDatesDaysFromNow.clear();
  };

  const datesDaysAgoSetNext = (days: number, date: SafeDateTime) => {
    inMemoryDatesDaysAgo.set(days, date);
  };
  const datesDaysAgoFlush = () => {
    inMemoryDatesDaysAgo.clear();
  };

  const layer = Layer.succeed(
    SafeDateTimeProvider,
    SafeDateTimeProvider.of({
      now: () =>
        Effect.try({
          try: () => inMemoryDateOfNow,
          catch: (unknown) =>
            SafeDateTimeProviderError.fromUnknown(unknown, {
              message: "Date of now providing failed.",
            }),
        }),
      tomorrow: () =>
        Effect.try({
          try: () => inMemoryDateOfTomorrow,
          catch: (unknown) =>
            new SafeDateTimeProviderError({
              message: "Date of tomorrow providing failed.",
              cause: errorEnsure(unknown),
            }),
        }),
      yesterday: () =>
        Effect.try({
          try: () => inMemoryDateOfYesterday,
          catch: (unknown) =>
            new SafeDateTimeProviderError({
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
            new SafeDateTimeProviderError({
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
            new SafeDateTimeProviderError({
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
