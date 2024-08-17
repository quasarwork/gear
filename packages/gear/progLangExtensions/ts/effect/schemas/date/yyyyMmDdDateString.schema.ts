import { Schema, String, brand, filter } from "@effect/schema/Schema";

const isValidYyyyMmDdDashedDateString = (str: string): boolean =>
  /^\d{4}-\d{2}-\d{2}$/.test(str);

export const YyyyMmDdDashedDateString = String.annotations({
  title: "YyyyMmDdDashedDateString",
  description: "A date string in the format yyyy-mm-dd",
}).pipe(
  filter(isValidYyyyMmDdDashedDateString),
  brand("YyyyMmDdDashedDateString"),
);
export type YyyyMmDdDashedDateString = Schema.Type<
  typeof YyyyMmDdDashedDateString
>;
