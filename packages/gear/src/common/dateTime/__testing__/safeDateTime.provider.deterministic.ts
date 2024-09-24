import { Effect, Layer } from "effect";

import { errorEnsure } from "../../errors/error.fns.js";
import { SafeDateTimeProviderError } from "../safeDateTime.provider.error.js";
import { SafeDateTimeProvider } from "../safeDateTime.provider.js";
import { SafeDateTime } from "../safeDateTime.schema.js";

export const SafeDateTimeProviderDeterministic = () => {
  let inMemoryDateOfNow: null | SafeDateTime = null;
  const dateOfNowSet = (date: SafeDateTime) => {
    inMemoryDateOfNow = date;
  };
  const dateOfNowFlush = () => {
    inMemoryDateOfNow = null;
  };

  let inMemoryDateOfYesterday: null | SafeDateTime = null;
  const dateOfYesterdaySet = (date: SafeDateTime) => {
    inMemoryDateOfYesterday = date;
  };
  const dateOfYesterdayFlush = () => {
    inMemoryDateOfYesterday = null;
  };

  let inMemoryDateOfTomorrow: null | SafeDateTime = null;
  const dateOfTomorrowSet = (date: SafeDateTime) => {
    inMemoryDateOfTomorrow = date;
  };
  const dateOfTomorrowFlush = () => {
    inMemoryDateOfTomorrow = null;
  };

  const inMemoryDatesDaysFromNow = new Map<number, SafeDateTime>();
  const datesDaysFromNowSetNext = (days: number, date: SafeDateTime) => {
    inMemoryDatesDaysFromNow.set(days, date);
  };
  const datesDaysFromNowFlush = () => {
    inMemoryDatesDaysFromNow.clear();
  };

  const inMemoryDatesDaysAgo = new Map<number, SafeDateTime>();
  const datesDaysAgoSetNext = (days: number, date: SafeDateTime) => {
    inMemoryDatesDaysAgo.set(days, date);
  };
  const datesDaysAgoFlush = () => {
    inMemoryDatesDaysAgo.clear();
  };

  const layer = Layer.succeed(
    SafeDateTimeProvider,
    SafeDateTimeProvider.of({
      daysAgo: (days) =>
        Effect.try({
          catch: (unknown) =>
            new SafeDateTimeProviderError({
              cause: errorEnsure(unknown),
              message: `Date of ${String(days)} days ago providing failed.`,
            }),
          try: () => {
            const date = inMemoryDatesDaysAgo.get(days);

            if (!date) {
              throw new Error(
                `Date of ${String(days)} days ago has not been defined in the in-memory map.`,
              );
            }

            return date;
          },
        }),
      daysFromNow: (days) =>
        Effect.try({
          catch: (unknown) =>
            new SafeDateTimeProviderError({
              cause: errorEnsure(unknown),
              message: `Date of ${String(days)} from now providing failed.`,
            }),
          try: () => {
            const date = inMemoryDatesDaysFromNow.get(days);

            if (!date) {
              throw new Error(
                `Date of ${String(days)} from now has not been defined in the in-memory map.`,
              );
            }

            return date;
          },
        }),
      now: () =>
        Effect.try({
          catch: (unknown) =>
            new SafeDateTimeProviderError({
              cause: errorEnsure(unknown),
              message: "Date of now providing failed.",
            }),
          try: () => {
            if (!inMemoryDateOfNow) {
              throw new Error(
                `Date of now has not been defined in the in-memory map.`,
              );
            }

            return inMemoryDateOfNow;
          },
        }),
      tomorrow: () =>
        Effect.try({
          catch: (unknown) =>
            new SafeDateTimeProviderError({
              cause: errorEnsure(unknown),
              message: "Date of tomorrow providing failed.",
            }),
          try: () => {
            if (!inMemoryDateOfTomorrow) {
              throw new Error(
                `Date of tomorrow has not been defined in the in-memory map.`,
              );
            }

            return inMemoryDateOfTomorrow;
          },
        }),
      yesterday: () =>
        Effect.try({
          catch: (unknown) =>
            new SafeDateTimeProviderError({
              cause: errorEnsure(unknown),
              message: "Date of yesterday providing failed.",
            }),
          try: () => {
            if (!inMemoryDateOfYesterday) {
              throw new Error(
                `Date of yesterday has not been defined in the in-memory map.`,
              );
            }

            return inMemoryDateOfYesterday;
          },
        }),
    }),
  );

  return {
    dateOfNowFlush,
    dateOfNowSet,
    dateOfTomorrowFlush,
    dateOfTomorrowSet,
    dateOfYesterdayFlush,
    dateOfYesterdaySet,
    datesDaysAgoFlush,
    datesDaysAgoSetNext,
    datesDaysFromNowFlush,
    datesDaysFromNowSetNext,
    layer,
  };
};
