import { brand, compose, filter, Schema } from "@effect/schema/Schema";

import { StringFromNumberOrString } from "../../string/schemas/stringFromNumberOrString.schema.js";
import { Id } from "../id.schema.js";

const isValidBigIntId = (id: number | string): boolean => {
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

export const BigIntId = compose(StringFromNumberOrString, Id)
  .annotations({
    description:
      "A shallow verification matching big integer ids from strings or numbers",
    identifier: "BigIntId",
    title: "BigIntId",
  })
  .pipe(filter(isValidBigIntId), brand("BigIntId"));
export type BigIntId = Schema.Type<typeof BigIntId>;
