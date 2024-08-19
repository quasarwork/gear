import { Data } from "effect";

export class IdGenerationError extends Data.TaggedError("ID_GENERATION_ERROR")<{
  message: string;
  cause?: Error["cause"];
  metadata?: Record<string, unknown>;
}> {}
