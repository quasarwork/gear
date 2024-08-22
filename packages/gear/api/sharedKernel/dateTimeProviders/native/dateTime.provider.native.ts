import { decodeSync } from "@effect/schema/ParseResult";
import { Effect, Layer } from "effect";

import { errorEnsure } from "#common/errors/error.fns.js";
import { SafeDate } from "#common/schemas/date/safeDate.schema.js";
import { DateTimeProviderError } from "#server/sharedKernel/dateTimeProviders/dateTime.provider.error.js";
import { DateTimeProvider } from "#server/sharedKernel/dateTimeProviders/dateTime.provider.js";

export const DateTimeProviderNative = Layer.succeed(
  DateTimeProvider,
  DateTimeProvider.of({
    now: () =>
      Effect.try({
        try: () => decodeSync(SafeDate)(new Date()),
        catch: (unknown) =>
          new DateTimeProviderError({
            message: "Date of now providing failed.",
            cause: errorEnsure(unknown),
          }),
      }),
    tomorrow: () =>
      Effect.try({
        try: () =>
          decodeSync(SafeDate)(
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new DateTimeProviderError({
            message: "Date of tomorrow providing failed.",
            cause: errorEnsure(unknown),
          }),
      }),
    yesterday: () =>
      Effect.try({
        try: () =>
          decodeSync(SafeDate)(
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new DateTimeProviderError({
            message: "Date of yesterday providing failed.",
            cause: errorEnsure(unknown),
          }),
      }),
    daysFromNow: (days) =>
      Effect.try({
        try: () =>
          decodeSync(SafeDate)(
            new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new DateTimeProviderError({
            message: `Date of ${String(days)} from now providing failed.`,
            cause: errorEnsure(unknown),
          }),
      }),
    daysAgo: (days) =>
      Effect.try({
        try: () =>
          decodeSync(SafeDate)(
            new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new DateTimeProviderError({
            message: `Date of ${String(days)} days ago providing failed.`,
            cause: errorEnsure(unknown),
          }),
      }),
  }),
);
