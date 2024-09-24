import { describe, expect, it } from "@effect/vitest";
import { Data, Effect } from "effect";

import { ErrorBaseProps } from "./errorBase.js";

describe("error base", () => {
  describe("from base class constructor", () => {
    it.effect("should be yieldable", () =>
      Effect.gen(function* () {
        class SomeError extends Data.TaggedError("SomeError")<ErrorBaseProps> {}

        const error = yield* Effect.flip(new SomeError({}));

        expect(error).toBeInstanceOf(SomeError);
      }),
    );

    describe("when the extended error defined a base message", () => {
      it.effect("should use the base message", () =>
        Effect.gen(function* () {
          class SomeError extends Data.TaggedError("SomeError")<
            Omit<ErrorBaseProps, "message">
          > {
            public override message = "Base message";
          }

          const error = yield* Effect.flip(new SomeError({}));

          expect(error.message).toBe("Base message");
        }),
      );
    });
  });
});
