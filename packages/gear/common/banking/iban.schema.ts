import { Schema, brand, filter } from "@effect/schema/Schema";

import { BoundedString } from "#common/string/schemas/boundedString.schema.js";

const isStandardIBANLength = (str: string) =>
  str.length >= 15 && str.length <= 34;

/**
 * Implements fast shallow verification of an International Bank Account Number.
 * This does not perform a IBAN real-time validation but instead check that the structure is valid.
 *
 * If you need stricter validation, consider using an external library.
 */
export const IBAN = BoundedString(15, 34)
  .annotations({
    identifier: "IBAN",
    title: "IBAN",
    description:
      "A shallow verification of an International Bank Account Number",
  })
  .pipe(filter(isStandardIBANLength), brand("IBAN"));
export type IBAN = Schema.Type<typeof IBAN>;
