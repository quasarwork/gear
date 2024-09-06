import { describe, expect, it } from "vitest";

import { stringEllipsis } from "./string.fns.js";

describe("stringEllipsis", () => {
  it("should return the original string if it's less than or equal to the max length", () => {
    const str = "Hello World";
    const maxLength = 20;
    const ellipsis = "...";

    const result = stringEllipsis(str, maxLength, ellipsis);

    expect(result).toBe(str);
  });

  it("should return the truncated string with the ellipsis added", () => {
    const str = "Hello World";
    const maxLength = 4;
    const ellipsis = "...";

    const result = stringEllipsis(str, maxLength, ellipsis);

    expect(result).toBe("H...");
  });

  describe("the ellipsis argument", () => {
    it('should default to "..."', () => {
      const str = "Hello World";
      const maxLength = 10;

      const result = stringEllipsis(str, maxLength);

      expect(result).toBe("Hello W...");
    });

    it("should allow the ellipsis to be customized", () => {
      const str = "Hello World";
      const maxLength = 7;
      const ellipsis = "___";

      const result = stringEllipsis(str, maxLength, ellipsis);

      expect(result).toBe("Hell___");
    });
  });
});
