import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { DateTimeProvider } from "#server/sharedKernel/application/dateTimeProviders/dateTime.provider";
import { DateTimeProviderNative } from "#server/sharedKernel/infrastructure/dateTimeProviders/native/dateTime.provider.native";

describe("date time provider", () => {
  const deps = DateTimeProviderNative;

  const dateOfNow = new Date();
  const dayOfDateOfNow = dateOfNow.getDay();
  const dayOfDateOfTomorrow = new Date(
    dateOfNow.getTime() + 24 * 60 * 60 * 1000,
  ).getDay();
  const dayOfDateOfYesterday = new Date(
    dateOfNow.getTime() - 24 * 60 * 60 * 1000,
  ).getDay();
  const dayOfDateOf2DaysFromNow = new Date(
    dateOfNow.getTime() + 2 * 24 * 60 * 60 * 1000,
  ).getDay();
  const dayOfDateOf2DaysAgo = new Date(
    dateOfNow.getTime() - 2 * 24 * 60 * 60 * 1000,
  ).getDay();

  describe("now", () => {
    it.effect("should provide the current date", () =>
      Effect.gen(function* () {
        const provider = yield* DateTimeProvider;

        const date = yield* provider.now();

        expect(date).toBeInstanceOf(Date);
        expect(date.getDay()).toBe(dayOfDateOfNow);
      }).pipe(Effect.provide(deps)),
    );
  });

  describe("tomorrow", () => {
    it.effect("should provide the tomorrow date", () =>
      Effect.gen(function* () {
        const provider = yield* DateTimeProvider;

        const date = yield* provider.tomorrow();

        expect(date).toBeInstanceOf(Date);
        expect(date.getDay()).toBe(dayOfDateOfTomorrow);
      }).pipe(Effect.provide(deps)),
    );
  });

  describe("yesterday", () => {
    it.effect("should provide the yesterday date", () =>
      Effect.gen(function* () {
        const provider = yield* DateTimeProvider;

        const date = yield* provider.yesterday();

        expect(date).toBeInstanceOf(Date);
        expect(date.getDay()).toBe(dayOfDateOfYesterday);
      }).pipe(Effect.provide(deps)),
    );
  });

  describe("x days from now", () => {
    it.effect(
      "should provide the date of the given number of days from now",
      () =>
        Effect.gen(function* () {
          const provider = yield* DateTimeProvider;

          const date = yield* provider.daysFromNow(2);

          expect(date).toBeInstanceOf(Date);
          expect(date.getDay()).toBe(dayOfDateOf2DaysFromNow);
        }).pipe(Effect.provide(deps)),
    );
  });

  describe("x days ago", () => {
    it.effect("should provide the date of the given number of days ago", () =>
      Effect.gen(function* () {
        const provider = yield* DateTimeProvider;

        const date = yield* provider.daysAgo(2);

        expect(date).toBeInstanceOf(Date);
        expect(date.getDay()).toBe(dayOfDateOf2DaysAgo);
      }).pipe(Effect.provide(deps)),
    );
  });
});
