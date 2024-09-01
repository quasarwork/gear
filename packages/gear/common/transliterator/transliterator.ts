import { PACKAGE_NAME } from "configs/package.constants.js";
import { Context, Effect } from "effect";

import { TransliteratorError } from "./transliterator.error.js";

export interface Transliterator {
  readonly slugify: (
    text: string,
  ) => Effect.Effect<string, TransliteratorError>;
}
export const Transliterator = Context.GenericTag<Transliterator>(
  `${PACKAGE_NAME}/common/Transliterator`,
);
