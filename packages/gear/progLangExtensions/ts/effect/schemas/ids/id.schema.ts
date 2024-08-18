import { Schema, brand } from "@effect/schema/Schema";

import { StringInRange1To254 } from "#progLangExtensions/ts/effect/schemas/string/stringInRange1To254.schema";

export const Id = StringInRange1To254.annotations({
  title: "Id",
  description: "A string of length 1-254 characters branded as an Id",
}).pipe(brand("Id"));
export type Id = Schema.Type<typeof Id>;
