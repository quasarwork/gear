import { Schema, String, brand, filter } from "@effect/schema/Schema";

const isValidYyyyMmDdDateString = (str: string): boolean =>
  /^\d{4}\d{2}\d{2}$/.test(str);

export const YyyyMmDdDateString = String.annotations({
  title: "YyyyMmDdDateString",
  description: "A date string in the format yyyymmdd",
}).pipe(filter(isValidYyyyMmDdDateString), brand("YyyyMmDdDateString"));
export type YyyyMmDdDateString = Schema.Type<typeof YyyyMmDdDateString>;
