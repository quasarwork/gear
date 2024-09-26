import { decode } from "@effect/schema/Schema";
import { Effect } from "effect";

import { BigIntId } from "./bigIntId.schema.js";

/**
 * Encodes a string to a BigIntId.
 *
 * This version uses the Web Crypto API, which is available in modern browsers.
 * The output is identical to the Node.js crypto version.
 *
 * @example
 *
 * ```ts
 * const id = yield * toBigIntIdEncode("some-string");
 * console.log(id); // 12345678901234567890n
 * ```
 */
export const toBigIntIdEncode = (input: string, maxDigits = 19) =>
  Effect.gen(function* () {
    // Convert input string to ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // Use Web Crypto API to create SHA-256 hash
    const hashBuffer = yield* Effect.tryPromise(() =>
      crypto.subtle.digest("SHA-256", data),
    );

    // Convert ArrayBuffer to hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // Convert the first 16 characters of the hash to a BigInt
    const hashPart = BigInt(`0x${hash.slice(0, 16)}`);

    // Ensure the result fits within the specified number of digits
    const maxValue = BigInt("9".repeat(maxDigits));
    const result = hashPart % maxValue;

    return yield* decode(BigIntId)(Number(result));
  });
