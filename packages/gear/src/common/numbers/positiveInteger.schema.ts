import {
  brand,
  filter,
  type Schema,
  Number as SchemaNumber,
} from "@effect/schema/Schema";

export const PositiveInteger = SchemaNumber.annotations({
  description: "A positive integer",
  identifier: "PositiveInteger",
  title: "PositiveInteger",
}).pipe(
  filter((value) => value >= 0 && Number.isInteger(value)),
  brand("PositiveInteger"),
);
export type PositiveInteger = Schema.Type<typeof PositiveInteger>;
