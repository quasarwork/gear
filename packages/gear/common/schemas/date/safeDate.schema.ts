import {
  DateFromSelf,
  Date as SDate,
  type Schema,
  Union,
  brand,
} from "@effect/schema/Schema";

export const SafeDate = Union(DateFromSelf, SDate)
  .annotations({
    title: "SafeDate",
    description: "A date either coming from a string or a Date object",
  })
  .pipe(brand("SafeDate"));
export type SafeDate = Schema.Type<typeof SafeDate>;
