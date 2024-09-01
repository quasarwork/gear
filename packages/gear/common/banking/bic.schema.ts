import { Schema, brand, filter } from "@effect/schema/Schema";

import { BoundedString } from "#common/string/boundedString.schema.js";

const isStandardBICLength = (str: string) =>
  str.length === 8 || str.length === 11;

/**
 * Implements fast shallow verification of a Bank Identifier Code.
 * This does not perform a BIC real-time validation but instead check that the structure is valid.
 *
 * If you need stricter validation, consider using an external library.
 */
export const BIC = BoundedString(8, 11)
  .annotations({
    identifier: "BIC",
    title: "BIC",
    description: "A shallow verification of a Bank Identifier Code",
  })
  .pipe(filter(isStandardBICLength), brand("Bic"));
export type BIC = Schema.Type<typeof BIC>;
