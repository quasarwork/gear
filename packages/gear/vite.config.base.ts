import { UserConfig } from "vitest/config";

export const viteConfigBase: UserConfig = {
  clearScreen: false,
  plugins: [],
  test: {
    include: ["./**/*.+(test|it-test|e2e-test).+(ts|js)"],
    testTimeout: 15 * 1000,
  },
};
