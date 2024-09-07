import { brand, Schema } from "@effect/schema/Schema";

import { BoundedString } from "./boundedString.schema.js";

export const StringInRange1To2048 = BoundedString(1, 2048).pipe(
  brand("StringInRange1To2048"),
);

export type StringInRange1To2048 = Schema.Type<typeof StringInRange1To2048>;
