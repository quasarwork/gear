import { describe, expect, it } from "vitest";

import { jsonPropertyToObjectOrNullUnsafe } from "#common/gadget/jsonProperty.parser.js";

describe("json property to object or null unsafe", () => {
  it("should convert a string to an object", () => {
    const value = jsonPropertyToObjectOrNullUnsafe({
      string: "foo",
    });

    expect(value).toEqual({ string: "foo" });
  });

  it("should convert a number to an object", () => {
    const value = jsonPropertyToObjectOrNullUnsafe(1000);

    expect(value).toEqual({ number: 1000 });
  });

  it("should convert a boolean to an object", () => {
    const value = jsonPropertyToObjectOrNullUnsafe(true);

    expect(value).toEqual({ boolean: true });
  });

  it("should convert an array to an object", () => {
    const value = jsonPropertyToObjectOrNullUnsafe([1, 2, 3]);

    expect(value).toEqual([1, 2, 3]);
  });

  it("should convert an object to an object", () => {
    const value = jsonPropertyToObjectOrNullUnsafe({
      foo: "bar",
    });

    expect(value).toEqual({ foo: "bar" });
  });

  it("should convert a null to null", () => {
    const value = jsonPropertyToObjectOrNullUnsafe(null);

    expect(value).toBeNull();
  });

  describe("when no match is found", () => {
    it("should return an empty object", () => {
      const value = jsonPropertyToObjectOrNullUnsafe(undefined!);

      expect(value).toEqual({});
    });
  });
});
