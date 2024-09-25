import { decode } from "@effect/schema/Schema";
import { Effect } from "effect";

import { BigIntId } from "./bigIntId.schema.js";

// FNV-1a hash function
const fnv1aHash = (str: string): bigint => {
  let hash = BigInt(0x811c9dc5);

  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i));
    hash = (hash * BigInt(0x1000193)) & BigInt(0xffffffff);
  }

  return hash;
};

/** Encodes a string to a BigIntId without using crypto. */
export const toBigIntIdEncode = (input: string, maxDigits = 19) =>
  Effect.gen(function* () {
    // Hash the input string using fnv1a
    const hash = fnv1aHash(input);

    // Ensure the result fits within the specified number of digits
    const maxValue = BigInt("9".repeat(maxDigits));
    const result = hash % maxValue;

    return yield* decode(BigIntId)(Number(result));
  });
