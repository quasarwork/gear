import {
  brand,
  DateFromSelf,
  type Schema,
  Date as SDate,
  Union,
} from "@effect/schema/Schema";

export const SafeDateTime = Union(DateFromSelf, SDate)
  .annotations({
    description: "A date either coming from a string or a Date object",
    identifier: "SafeDateTime",
    title: "SafeDateTime",
  })
  .pipe(brand("SafeDateTime"));
export type SafeDateTime = Schema.Type<typeof SafeDateTime>;
