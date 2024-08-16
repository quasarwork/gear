import { Schema, brand, filter } from "@effect/schema/Schema";

import { StringInRange1To2048 } from "../string/stringInRange1To2048.schema";

/**
 * @see https://www.ietf.org/rfc/rfc3986.txt
 */
const isValidAbsoluteUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

export const AbsoluteUrl = StringInRange1To2048.annotations({
  title: "AbsoluteUrl",
  description: "A valid absolute URL according to RFC",
}).pipe(filter(isValidAbsoluteUrl), brand("AbsoluteUrl"));
export type AbsoluteUrl = Schema.Type<typeof AbsoluteUrl>;
