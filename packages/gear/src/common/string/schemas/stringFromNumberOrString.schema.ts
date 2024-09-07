import {
  type Schema,
  Number as SchemaNumber,
  String,
  transform,
  Union,
} from "@effect/schema/Schema";

export const StringFromNumberOrString = transform(
  Union(SchemaNumber, String),
  String,
  {
    decode: (num) => num.toString(),
    encode: (str) => Number(str),
  },
).annotations({
  description: "It accepts a string or a number and returns a string",
  identifier: "StringFromNumberOrString",
  title: "StringFromNumberOrString",
});
export type StringFromNumberOrString = Schema.Type<
  typeof StringFromNumberOrString
>;
