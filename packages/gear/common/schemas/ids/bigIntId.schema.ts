import { Schema, brand, compose, filter } from "@effect/schema/Schema";
import { StringFromNumber } from "common/schemas/string/stringFromNumber.schema.js";

import { Id } from "#common/schemas/ids/id.schema.js";

const isValidBigIntId = (id: string | number): boolean => {
  // Gadget DB only supports big init ids with up to 19 digits
  const MAX_DIGITS = 19;

  return (
    !String(id).startsWith("0") &&
    !Number.isNaN(Number(id)) &&
    Number(id) % 1 === 0 &&
    Number(id) > 0 &&
    String(id).length <= MAX_DIGITS
  );
};

export const BigIntId = compose(StringFromNumber, Id)
  .annotations({
    title: "BigIntId",
    description:
      "A shallow verification matching big integer ids from strings or numbers",
  })
  .pipe(filter(isValidBigIntId), brand("BigIntId"));
export type BigIntId = Schema.Type<typeof BigIntId>;
