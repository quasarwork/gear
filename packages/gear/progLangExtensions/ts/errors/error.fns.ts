import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_ERROR_NAME,
  DEFAULT_ERROR_STACK,
} from "./error.constants";
import { FromUnknownThrownError } from "./fromUnknownThrownError";

/**
 * @see https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5
 * @see https://github.com/sindresorhus/ensure-error/blob/main/index.js
 */
export const errorEnsure = (unknown: unknown) => {
  const STRINGIFIED_UNKNOWN = "<Unable to stringify the thrown value>";

  if (!(unknown instanceof Error)) {
    let stringifiedThrownValue: string;
    try {
      stringifiedThrownValue =
        unknown === undefined ? "undefined" : JSON.stringify(unknown);
    } catch {
      stringifiedThrownValue = STRINGIFIED_UNKNOWN;
    }

    return new FromUnknownThrownError({
      message: stringifiedThrownValue,
    });
  }

  const error = unknown;

  if (!error.name) {
    Object.defineProperty(error, "name", {
      value: error.constructor.name || DEFAULT_ERROR_NAME,
      configurable: true,
      writable: true,
    });
  }

  if (!error.message) {
    Object.defineProperty(error, "message", {
      value: DEFAULT_ERROR_MESSAGE,
      configurable: true,
      writable: true,
    });
  }

  if (!error.stack) {
    const newError = new Error(error.message);

    Object.defineProperty(error, "stack", {
      value: newError.stack
        ? newError.stack.replace(/\n {4}at /, DEFAULT_ERROR_STACK)
        : DEFAULT_ERROR_STACK,
      configurable: true,
      writable: true,
    });
  }

  return error;
};
