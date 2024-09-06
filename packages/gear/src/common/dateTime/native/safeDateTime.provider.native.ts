import { decodeSync } from "@effect/schema/ParseResult";
import { Effect, Layer } from "effect";

import { errorEnsure } from "../../errors/index.js";
import { SafeDateTimeProviderError } from "../safeDateTime.provider.error.js";
import { SafeDateTimeProvider } from "../safeDateTime.provider.js";
import { SafeDateTime } from "../safeDateTime.schema.js";

export const SafeDateTimeProviderNative = Layer.succeed(
  SafeDateTimeProvider,
  SafeDateTimeProvider.of({
    now: () =>
      Effect.try({
        try: () => decodeSync(SafeDateTime)(new Date()),
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            message: "Date of now providing failed.",
            cause: errorEnsure(unknown),
          }),
      }),
    tomorrow: () =>
      Effect.try({
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            message: "Date of tomorrow providing failed.",
            cause: errorEnsure(unknown),
          }),
      }),
    yesterday: () =>
      Effect.try({
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            message: "Date of yesterday providing failed.",
            cause: errorEnsure(unknown),
          }),
      }),
    daysFromNow: (days) =>
      Effect.try({
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            message: `Date of ${String(days)} from now providing failed.`,
            cause: errorEnsure(unknown),
          }),
      }),
    daysAgo: (days) =>
      Effect.try({
        try: () =>
          decodeSync(SafeDateTime)(
            new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
          ),
        catch: (unknown) =>
          new SafeDateTimeProviderError({
            message: `Date of ${String(days)} days ago providing failed.`,
            cause: errorEnsure(unknown),
          }),
      }),
  }),
);
