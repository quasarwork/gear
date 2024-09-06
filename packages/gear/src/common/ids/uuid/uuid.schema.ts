import { Schema, brand, filter } from "@effect/schema/Schema";

import { Id } from "../id.schema.js";

export const isValidUuid = (uuid: string): boolean => {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return UUID_REGEX.test(uuid);
};

export const Uuid = Id.annotations({
  identifier: "Uuid",
  title: "Uuid",
  description:
    "A shallow verification matching Uuid versions form 1 to 5 and variants (8, 9, a, b)",
}).pipe(filter(isValidUuid), brand("Uuid"));
export type Uuid = Schema.Type<typeof Uuid>;
