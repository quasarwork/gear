import {
  DateFromSelf,
  Date as SDate,
  type Schema,
  Union,
  brand,
} from "@effect/schema/Schema";

export const SafeDateTime = Union(DateFromSelf, SDate)
  .annotations({
    identifier: "SafeDateTime",
    title: "SafeDateTime",
    description: "A date either coming from a string or a Date object",
  })
  .pipe(brand("SafeDateTime"));
export type SafeDateTime = Schema.Type<typeof SafeDateTime>;
