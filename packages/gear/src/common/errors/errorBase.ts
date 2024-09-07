import { Cause, Types } from "effect";

import { DEFAULT_ERROR_MESSAGE } from "./error.constants.js";
import { errorEnsure } from "./error.fns.js";

// This should be the right way, however there is definitely an issue with Typescript on that one
// See various GitHub and StackOverflow issues for:
// ```
// TS4023: Exported variable X has or is using name Y from external module
// <PATH>
// but cannot be named.
// ```

// interface ErrorBaseProps {
//   message?: string;
//   cause?: Error["cause"];
//   metadata?: Record<string, unknown>;
// }
//
// export const ErrorBase = <Tag extends string>(tag: Tag) =>
//   class extends Data.TaggedError(tag)<ErrorBaseProps> {
//     constructor(args: ErrorBaseProps = { message: DEFAULT_ERROR_MESSAGE }) {
//       super(args);
//     }
//
//     public static fromUnknown(
//       unknown: unknown,
//       { message, metadata }: Omit<ErrorBaseProps, "cause">,
//     ) {
//       const error = errorEnsure(unknown);
//
//       return new this({
//         message: message ?? DEFAULT_ERROR_MESSAGE,
//         cause: error,
//         metadata: metadata ?? {},
//       });
//     }
//   };

export const ErrorBase = <Tag extends string>(
  tag: Tag,
): {
  fromUnknown<A extends Record<string, unknown> = Record<string, unknown>>(
    unknown: unknown,
    options?: {
      message?: string;
      metadata?: Record<string, unknown>;
    },
  ): { readonly _tag: Tag } & Cause.YieldableError & Readonly<A>;
  new <A extends Record<string, unknown> = Record<string, unknown>>(
    args?: {
      cause?: Error["cause"];
      message?: string;
      metadata?: Record<string, unknown>;
    } & (Types.Equals<A, Record<string, unknown>> extends true
      ? unknown
      : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P] }),
  ): { readonly _tag: Tag } & Cause.YieldableError & Readonly<A>;
} => {
  // @ts-expect-error TS2420: Class Base incorrectly implements interface YieldableError
  class Base extends Error implements Cause.YieldableError {
    readonly _tag: Tag = tag;

    constructor(
      args: {
        cause?: Error["cause"];
        message?: string;
        metadata?: Record<string, unknown>;
      } = {},
    ) {
      super(args.message ?? DEFAULT_ERROR_MESSAGE);
      if (args.cause) this.cause = args.cause;
      if (args.metadata) Object.assign(this, args.metadata);
    }

    static fromUnknown(
      unknown: unknown,
      options: {
        message?: string;
        metadata?: Record<string, unknown>;
      } = {},
    ) {
      const error = errorEnsure(unknown);
      return new Base({
        cause: error,
        message: options.message ?? DEFAULT_ERROR_MESSAGE,
        metadata: options.metadata ?? {},
      });
    }
  }

  Object.defineProperty(Base, "name", { value: tag });

  // eslint-disable-next-line
  return Base as any;
};
