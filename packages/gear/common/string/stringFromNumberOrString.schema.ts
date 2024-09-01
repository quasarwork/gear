import {
  type Schema,
  Number as SchemaNumber,
  String,
  Union,
  transform,
} from "@effect/schema/Schema";

export const StringFromNumberOrString = transform(
  Union(SchemaNumber, String),
  String,
  {
    decode: (num) => num.toString(),
    encode: (str) => Number(str),
  },
).annotations({
  identifier: "StringFromNumberOrString",
  title: "StringFromNumberOrString",
  description: "It accepts a string or a number and returns a string",
});
export type StringFromNumberOrString = Schema.Type<
  typeof StringFromNumberOrString
>;
