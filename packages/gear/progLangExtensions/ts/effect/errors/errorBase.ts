import { Data } from "effect";

export const ErrorBase = <Tag extends string>(tag: Tag) =>
  class extends Data.TaggedError(tag)<{
    message: string;
    cause?: Error["cause"];
    metadata?: Record<string, unknown>;
  }> {
    constructor(
      args: {
        message: string;
        cause?: Error["cause"];
        metadata?: Record<string, unknown>;
      } = { message: "" },
    ) {
      super(args);
    }
  };
