import { decodeSync } from "@effect/schema/ParseResult";
import { Effect, Layer } from "effect";

import { errorEnsure } from "../../errors/error.fns.js";
import { SafeDateTimeProviderError } from "../safeDateTime.provider.error.js";
import { SafeDateTimeProvider } from "../safeDateTime.provider.js";
import { SafeDateTime } from "../safeDateTime.schema.js";

export const SafeDateTimeProviderNative = Layer.succeed(
  SafeDateTimeProvider,
  SafeDateTimeProvider.of({
    daysAgo: (days) =>
      Effect.try({
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            cause: errorEnsure(unknown),
            message: `Date of ${String(days)} days ago providing failed.`,
          }),
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
          ),
      }),
    daysFromNow: (days) =>
      Effect.try({
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            cause: errorEnsure(unknown),
            message: `Date of ${String(days)} from now providing failed.`,
          }),
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000),
          ),
      }),
    now: () =>
      Effect.try({
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            cause: errorEnsure(unknown),
            message: "Date of now providing failed.",
          }),
        try: () => decodeSync(SafeDateTime)(new Date()),
      }),
    tomorrow: () =>
      Effect.try({
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            cause: errorEnsure(unknown),
            message: "Date of tomorrow providing failed.",
          }),
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          ),
      }),
    yesterday: () =>
      Effect.try({
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            cause: errorEnsure(unknown),
            message: "Date of yesterday providing failed.",
          }),
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          ),
      }),
  }),
);
