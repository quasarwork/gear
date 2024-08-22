import {
  type Schema,
  Number as SchemaNumber,
  brand,
  filter,
} from "@effect/schema/Schema";

export const PositiveInteger = SchemaNumber.annotations({
  title: "PositiveInteger",
  description: "A positive integer",
}).pipe(
  filter((value) => value >= 0 && Number.isInteger(value)),
  brand("PositiveInteger"),
);
export type PositiveInteger = Schema.Type<typeof PositiveInteger>;
