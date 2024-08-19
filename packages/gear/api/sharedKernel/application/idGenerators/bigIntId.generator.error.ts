import { ErrorBase } from "#progLangExtensions/ts/effect/errors/errorBase";

export class BigIntIdGeneratorError extends ErrorBase(
  "BIG_INT_ID_GENERATOR_ERROR",
) {}
