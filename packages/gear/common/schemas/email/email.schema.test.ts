import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Email } from "common/schemas/email/email.schema.js";
import { Effect } from "effect";

describe("email schema", () => {
  it("should accept valid email addresses", () =>
    Effect.gen(function* () {
      const someValidEmail = "john.doe@gmail.com";

      const result = yield* decode(Email)(someValidEmail);

      expect(result).toBe(someValidEmail);
    }));

  it("should reject invalid email addresses", () =>
    Effect.gen(function* () {
      const someInvalidEmail = "john.doegmail.com";

      const result = yield* Effect.flip(decode(Email)(someInvalidEmail));

      expect(result).toBeInstanceOf(ParseError);
    }));
});
