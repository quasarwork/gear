import { Data } from "effect";

export class FromUnknownThrownError extends Data.TaggedError(
  "FROM_UNKNOWN_THROWN_ERROR",
)<{
  message: string;
}> {}
