// import { Schema, brand, filter } from "@effect/schema/Schema";
//
// import { StringInRange1To254 } from "#progLangExtensions/ts/effect/schemas/string/stringInRange1To254.schema";
//
// const SIMPLIFIED_SHALLOW_PHONE_REGEX = /^\+[0-9]{1,3}-[0-9]{3}-[0-9]{4}$/;
//
// /**
//  * Implements fast shallow verification of hostnames.
//  * This does not perform a phone number real-time validation but instead check that the structure is valid.
//  *
//  * If you need stricter validation, consider using an external library.
//  */
// const isValidPhone = (phone: string): boolean => {
//   const isValidAscii = (code: number): boolean =>
//     (code >= 48 && code <= 57) || code === 45 || code === 46;
//
//   const normalizedPhone = phone.replace(/[\s.-]/g, "");
//
//   if (normalizedPhone.length < 8 || normalizedPhone.length > 15) {
//     return false;
//   }
//
//   if (!SIMPLIFIED_SHALLOW_PHONE_REGEX.test(normalizedPhone)) {
//     return false;
//   }
//
//   let lastCharCode = -1;
//   const len = phone.length;
//
//   for (let i = 0; i < len; i += 1) {
//     const code = phone.charCodeAt(i);
//     if (!(/*@__INLINE__*/ (isValidAscii(code) || code === 45 || code === 46))) {
//       // Check if there is a forbidden character in the label
//       return false;
//     }
//
//     lastCharCode = code;
//   }
//
//   return lastCharCode === 46;
// };
//
// export const Phone = StringInRange1To254.annotations({
//   title: "Phone",
//   description: "A shallow verification of a phone number",
// }).pipe(filter(isValidPhone), brand("Phone"));
// export type Phone = Schema.Type<typeof Phone>;
import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { Phone } from "./phone.schema";

describe("phone schema", () => {
  it.effect("should accept valid phone numbers", () =>
    Effect.gen(function* () {
      const someValidPhoneWithPlus = "+33666666666";
      const someValidPhoneWithoutPlus = "03666666666";

      const someValidPhoneWithPlusResult = yield* decode(Phone)(
        someValidPhoneWithPlus,
      );
      const someValidPhoneWithoutPlusResult = yield* decode(Phone)(
        someValidPhoneWithoutPlus,
      );

      expect(someValidPhoneWithPlusResult).toBe(someValidPhoneWithPlus);
      expect(someValidPhoneWithoutPlusResult).toBe(someValidPhoneWithoutPlus);
    }),
  );

  it.effect("should reject invalid phone numbers", () =>
    Effect.gen(function* () {
      const someInvalidPhone = "-33+123456789";

      const result = yield* Effect.flip(decode(Phone)(someInvalidPhone));

      expect(result).toBeInstanceOf(ParseError);
    }),
  );
});
