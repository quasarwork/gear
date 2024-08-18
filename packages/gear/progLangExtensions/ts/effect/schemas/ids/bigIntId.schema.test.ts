import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { BigIntId } from "./bigIntId.schema";

describe("big int id schema", () => {
  const BIGINT_ID_VALID = ["123", "1234567891234567891", 50077];

  const BIGINT_ID_INVALID = [
    "01234",
    "123.456",
    "1234567890123456789012345678901234567890",
  ];

  describe("valid big int ids", () => {
    for (const id of BIGINT_ID_VALID) {
      it.effect(`should accept ${String(id)} and return it as a string`, () =>
        Effect.gen(function* () {
          const result = yield* decode(BigIntId)(id);

          expect(result).toBe(String(id));
        }),
      );
    }
  });

  describe("invalid big int ids", () => {
    for (const id of BIGINT_ID_INVALID) {
      it.effect(`should reject ${id}`, () =>
        Effect.gen(function* () {
          const result = yield* Effect.flip(decode(BigIntId)(id));

          expect(result).toBeInstanceOf(ParseError);
        }),
      );
    }
  });
});
