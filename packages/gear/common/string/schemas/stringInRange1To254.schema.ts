import { Schema, brand } from "@effect/schema/Schema";

import { BoundedString } from "#common/string/schemas/boundedString.schema.js";

export const StringInRange1To254 = BoundedString(1, 254).pipe(
  brand("StringInRange1To254"),
);

export type StringInRange1To254 = Schema.Type<typeof StringInRange1To254>;
