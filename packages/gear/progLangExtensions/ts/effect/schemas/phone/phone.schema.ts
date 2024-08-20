import { Schema, brand, filter } from "@effect/schema/Schema";

import { StringInRange1To254 } from "#progLangExtensions/ts/effect/schemas/string/stringInRange1To254.schema.js";

/**
 * Implements fast shallow verification of phone numbers.
 * This does not perform a phone number real-time validation but instead check that the structure is valid.
 *
 * If you need stricter validation, consider using an external library.
 */
const isValidPhone = (phone: string): boolean => {
  const ASCII_CODE_0 = 48;
  const ASCII_CODE_9 = 57;
  const ASCII_CODE_HYPHEN = 45;
  const ASCII_CODE_DOT = 46;
  const ASCII_CODE_PLUS = 43;
  const PHONE_MIN_LENGTH = 8;
  const PHONE_MAX_LENGTH = 15;
  const SIMPLIFIED_SHALLOW_PHONE_REGEX =
    /^\+?[0-9]{1,3}[-.()\s]?[0-9]{1,4}[-.()\s]?[0-9]{1,4}[-.()\s]?[0-9]{1,9}$/;

  const isValidAscii = (code: number): boolean =>
    (code >= ASCII_CODE_0 && code <= ASCII_CODE_9) ||
    code === ASCII_CODE_HYPHEN ||
    code === ASCII_CODE_DOT;

  const normalizedPhone = phone.replace(/[\s.-]/g, "");

  if (
    normalizedPhone.length < PHONE_MIN_LENGTH ||
    normalizedPhone.length > PHONE_MAX_LENGTH
  ) {
    return false;
  }

  if (!SIMPLIFIED_SHALLOW_PHONE_REGEX.test(normalizedPhone)) {
    return false;
  }

  let lastCharCode = -1;
  const len = phone.length;

  for (let i = 0; i < len; i += 1) {
    const code = phone.charCodeAt(i);

    if (i === 0 && code === ASCII_CODE_PLUS) {
      continue;
    }

    if (!isValidAscii(code)) {
      return false;
    }

    lastCharCode = code;
  }

  return ![ASCII_CODE_DOT, ASCII_CODE_HYPHEN].includes(lastCharCode);
};

export const Phone = StringInRange1To254.annotations({
  title: "Phone",
  description: "A shallow verification of a phone number",
}).pipe(filter(isValidPhone), brand("Phone"));
export type Phone = Schema.Type<typeof Phone>;
