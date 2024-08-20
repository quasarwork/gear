import { describe, expect, it } from "vitest";

import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_ERROR_NAME,
  DEFAULT_ERROR_STACK,
} from "./error.constants.js";
import { errorEnsure } from "./error.fns.js";
import { FromUnknownThrownError } from "./fromUnknownThrownError.js";

describe("errorEnsure", () => {
  describe("given an unknown thrown value", () => {
    describe("when the value is not an instance of Error", () => {
      it("should return a FROM_UNKNOWN_THROWN_ERROR with stringified value as message", () => {
        const notAnError = { foo: "bar" };

        const result = errorEnsure(notAnError);

        expect(result).toBeInstanceOf(FromUnknownThrownError);
        expect(result.message).toBe(JSON.stringify(notAnError));
      });

      it("should return a FROM_UNKNOWN_THROWN_ERROR with fallback message when value can't be stringified", () => {
        const circularReference: {
          self: null | typeof circularReference;
        } = {
          self: null,
        };
        circularReference.self = circularReference;

        const result = errorEnsure(circularReference);

        expect(result).toBeInstanceOf(FromUnknownThrownError);
        expect(result.message).toBe("<Unable to stringify the thrown value>");
      });

      it("should return a FROM_UNKNOWN_THROWN_ERROR for primitive values", () => {
        expect(errorEnsure(42)).toBeInstanceOf(FromUnknownThrownError);
        expect(errorEnsure(42).message).toBe("42");

        expect(errorEnsure("string")).toBeInstanceOf(FromUnknownThrownError);
        expect(errorEnsure("string").message).toBe('"string"');

        expect(errorEnsure(true)).toBeInstanceOf(FromUnknownThrownError);
        expect(errorEnsure(true).message).toBe("true");

        expect(errorEnsure(null)).toBeInstanceOf(FromUnknownThrownError);
        expect(errorEnsure(null).message).toBe("null");

        expect(errorEnsure(undefined)).toBeInstanceOf(FromUnknownThrownError);
        expect(errorEnsure(undefined).message).toBe("undefined");
      });
    });

    describe("when the value is an instance of Error", () => {
      it("should return the error as is if it has all properties", () => {
        const error = new Error("Test error");

        const result = errorEnsure(error);

        expect(result).toBe(error);
        expect(result.name).toBe("Error");
        expect(result.message).toBe("Test error");
        expect(result.stack).toBeDefined();
      });

      it("should add name if missing", () => {
        const error = new Error("Test error");
        // @ts-expect-error - we are testing the errorEnsure function
        delete error.name;

        const result = errorEnsure(error);

        expect(result.name).toBe("Error");
      });

      it("should add message if missing", () => {
        const error = new Error();
        // @ts-expect-error - we are testing the errorEnsure function
        delete error.message;

        const result = errorEnsure(error);

        expect(result.message).toBe(DEFAULT_ERROR_MESSAGE);
      });

      it("should add stack if missing", () => {
        const error = new Error("Test error");
        delete error.stack;

        const result = errorEnsure(error);

        expect(result.stack).toContain(DEFAULT_ERROR_STACK);
      });

      it("should use DEFAULT_ERROR_NAME if constructor name is not available", () => {
        const error = new Error("Test error");
        // @ts-expect-error - we are testing the errorEnsure function
        delete error.name;
        Object.defineProperty(error.constructor, "name", { value: undefined });

        const result = errorEnsure(error);

        expect(result.name).toBe(DEFAULT_ERROR_NAME);
      });
    });
  });
});
