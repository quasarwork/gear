import { decode } from "@effect/schema/Schema";
import { createHash } from "crypto";
import { Effect } from "effect";

import { BigIntId } from "./bigIntId.schema.js";

/**
 * @description Encodes a string to a BigIntId.
 *
 * Gadget currently only supports BigInt Ids.
 * This makes dealing with third-party APIs much harder when it comes to using their own IDs.
 *
 * Hence, we use an ID encoder that turns the remote ID into a BigInt in order to have a deterministic ID
 * that can be accessed more easily.
 *
 * This is a lossy encoding (one way encoding), as the IDs are limited to 19 digits. This is due to Gadget only supporting
 * a maximum of 19 digits for IDs in their database.
 *
 * In most cases, this is sufficient, however based on the lossy nature of the encoding, we may rarely run into collisions.
 *
 * @example
 *
 * ```ts
 * const id = yield* toBigIntIdEncode("some-string");
 * console.log(id); // 12345678901234567890n
 * ```
 */
export const toBigIntIdEncode = (input: string, maxDigits = 19) =>
  Effect.gen(function* () {
    // Hash the input string
    const hash = createHash("sha256").update(input).digest("hex");

    // Convert the first 16 characters of the hash to a BigInt
    const hashPart = BigInt(`0x${hash.slice(0, 16)}`);

    // Ensure the result fits within the specified number of digits
    const maxValue = BigInt("9".repeat(maxDigits));
    const result = hashPart % maxValue;

    return yield* decode(BigIntId)(Number(result));
  });
