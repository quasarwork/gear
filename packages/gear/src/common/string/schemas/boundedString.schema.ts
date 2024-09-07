import { brand, filter, Schema, String } from "@effect/schema/Schema";

export const BoundedString = (min: number, max: number) =>
  String.pipe(filter((str) => str.length >= min && str.length <= max))
    .annotations({
      description: `A string with a length between ${min.toString()} and ${max.toString()}`,
      identifier: "BoundedString",
      title: `BoundedString(${min.toString()}, ${max.toString()})`,
    })
    .pipe(brand("BoundedString"));

export type BoundedString = Schema.Type<ReturnType<typeof BoundedString>>;
