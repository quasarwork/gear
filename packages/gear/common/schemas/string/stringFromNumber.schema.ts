import {
  type Schema,
  Number as SchemaNumber,
  String,
  Union,
  transform,
} from "@effect/schema/Schema";

export const StringFromNumber = transform(Union(SchemaNumber, String), String, {
  decode: (num) => num.toString(),
  encode: (str) => Number(str),
}).annotations({
  title: "StringFromNumber",
  description: "It accepts a string or a number and returns a string",
});
export type StringFromNumber = Schema.Type<typeof StringFromNumber>;
