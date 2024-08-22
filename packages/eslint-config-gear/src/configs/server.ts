import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import globals from "globals";

import baseConfig from "./base.js";

export default (
  plugin: FlatConfig.Plugin,
  parser: FlatConfig.Parser,
): FlatConfig.ConfigArray => [
  ...baseConfig(plugin, parser),
  {
    name: "@quasarwork/eslint-config-gear/server",
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ["**/api/*", "**/web/*"],
  },
];
