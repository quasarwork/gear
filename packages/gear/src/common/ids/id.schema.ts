import { Schema, brand } from "@effect/schema/Schema";

import { StringInRange1To254 } from "../string/index.js";

export const Id = StringInRange1To254.annotations({
  identifier: "Id",
  title: "Id",
  description: "A string of length 1-254 characters branded as an Id",
}).pipe(brand("Id"));
export type Id = Schema.Type<typeof Id>;