import { brand, Schema } from "@effect/schema/Schema";

import { StringInRange1To254 } from "../string/schemas/stringInRange1To254.schema.js";

export const Id = StringInRange1To254.annotations({
  description: "A string of length 1-254 characters branded as an Id",
  identifier: "Id",
  title: "Id",
}).pipe(brand("Id"));
export type Id = Schema.Type<typeof Id>;
