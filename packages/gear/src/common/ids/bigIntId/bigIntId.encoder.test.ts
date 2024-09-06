import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { toBigIntIdEncode } from "./bigIntId.encoder.js";

describe("big int id encoder", () => {
  it.effect("should encode a string to a big int id", () =>
    Effect.gen(function* () {
      const someStringId = "cst_44557_xy";
      const expectedResult = "5524999475407944000";

      const result = yield* toBigIntIdEncode(someStringId);

      expect(result).toBe(expectedResult);
    }),
  );

  describe("when encoding the same string N times", () => {
    it.effect("should return the same big int id", () =>
      Effect.gen(function* () {
        const someStringId = "cst_44557_xy";
        const expectedResult = "5524999475407944000";

        const N = 10;
        for (let i = 0; i < N; i++) {
          const result = yield* toBigIntIdEncode(someStringId);

          expect(result).toBe(expectedResult);
        }
      }),
    );
  });

  describe("its output length should never exceed configured maxDigits", () => {
    const someLongStringId = "cst_44557_xy".repeat(10);

    const configuredMaxDigits = [5, 10, 19];
    // const expectedResult = ["55249", "5524999475", "5524999475407944000"];
    const expectedResult = new Map([
      [5, "66076"],
      [10, "5056615510"],
      [19, "2576480063798967300"],
    ]);

    for (const maxDigits of configuredMaxDigits) {
      it.effect(
        `should return a big int id with a length of ${String(maxDigits)} digits`,
        () =>
          Effect.gen(function* () {
            const result = yield* toBigIntIdEncode(someLongStringId, maxDigits);

            expect(result).toBe(expectedResult.get(maxDigits));
            expect(result.length).toBe(maxDigits);
          }),
      );
    }
  });
});
