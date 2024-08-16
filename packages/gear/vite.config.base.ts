import { UserConfig } from "vitest/config";

export const viteConfigBase: UserConfig = {
  plugins: [],
  clearScreen: false,
  test: {
    testTimeout: 15 * 1000,
    include: ["./**/*.+(test|it-test|e2e-test).+(ts|js)"],
  },
};
