// import { Schema, brand, filter } from "@effect/schema/Schema";
//
// import { StringInRange1To2048 } from "#progLangExtensions/ts/effect/schemas/string/stringInRange1To2048.schema";
//
// /**
//  * @see https://github.com/remusao/tldts/blob/master/packages/tldts-core/src/is-valid.ts
//  */
// const isValidHostname = (hostname: string): boolean => {
//   const isValidAscii = (code: number): boolean =>
//     (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || code > 127;
//
//   if (
//     !isValidAscii(hostname.charCodeAt(0)) &&
//     hostname.charCodeAt(0) !== 46 && // '.' (dot)
//     hostname.charCodeAt(0) !== 95 // '_' (underscore)
//   ) {
//     return false;
//   }
//
//   // Validate hostname according to RFC
//   let lastDotIndex = -1;
//   let lastCharCode = -1;
//   const len = hostname.length;
//
//   for (let i = 0; i < len; i += 1) {
//     const code = hostname.charCodeAt(i);
//     if (code === 46 /* '.' */) {
//       if (
//         // Check that previous label is < 63 bytes long (64 = 63 + '.')
//         i - lastDotIndex > 64 ||
//         // Check that previous character was not already a '.'
//         lastCharCode === 46 ||
//         // Check that the previous label does not end with a '-' (dash)
//         lastCharCode === 45 ||
//         // Check that the previous label does not end with a '_' (underscore)
//         lastCharCode === 95
//       ) {
//         return false;
//       }
//
//       lastDotIndex = i;
//     } else if (
//       !(/*@__INLINE__*/ (isValidAscii(code) || code === 45 || code === 95))
//     ) {
//       // Check if there is a forbidden character in the label
//       return false;
//     }
//
//     lastCharCode = code;
//   }
//
//   return (
//     // Check that last label is shorter than 63 chars
//     len - lastDotIndex - 1 <= 63 &&
//     // Check that the last character is an allowed trailing label character.
//     // Since we already checked that the char is a valid hostname character,
//     // we only need to check that it's different from '-'.
//     lastCharCode !== 45
//   );
// };
//
// export const HostName = StringInRange1To2048.annotations({
//   title: "HostName",
//   description: "A valid hostname according to RFC",
// }).pipe(filter(isValidHostname), brand("HostName"));
// export type HostName = Schema.Type<typeof HostName>;
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { HostName } from "./hostname.schema";

describe("hostname schema", () => {
  it.effect("should accept valid hostnames", () =>
    Effect.gen(function* () {
      const someValidHostname = "www.google.com";

      const result = yield* decode(HostName)(someValidHostname);

      expect(result).toBe(someValidHostname);
    }),
  );

  it.effect("should reject invalid hostnames", () =>
    Effect.gen(function* () {
      const someInvalidHostname = "https://www.google.com";

      const result = yield* Effect.flip(decode(HostName)(someInvalidHostname));

      expect(result).toBeInstanceOf(Error);
    }),
  );
});
