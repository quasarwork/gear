import tsconfigPaths from "vite-tsconfig-paths";
import { UserConfig } from "vitest/config";

export const viteConfigBase: UserConfig = {
  plugins: [tsconfigPaths()],
  clearScreen: false,
  test: {
    testTimeout: 15 * 1000,
    include: ["./**/*.+(test|it-test|e2e-test).+(ts|js)"],
  },
};
