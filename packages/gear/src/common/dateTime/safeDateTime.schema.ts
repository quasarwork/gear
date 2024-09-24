import {
  DateFromSelf,
  type Schema,
  Date as SchemaDate,
  transform,
  Union,
} from "@effect/schema/Schema";

export const SafeDateTime = transform(
  Union(DateFromSelf, SchemaDate),
  DateFromSelf,
  {
    decode: (date) => date,
    encode: (date) => date,
  },
).annotations({
  description: "A date either coming from a string or a Date object",
  identifier: "SafeDateTime",
  title: "SafeDateTime",
});
export type SafeDateTime = Schema.Type<typeof SafeDateTime>;
