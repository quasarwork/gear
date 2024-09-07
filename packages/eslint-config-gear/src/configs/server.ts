import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

import globals from "globals";

import baseConfig from "./base.js";

export default (
  plugin: FlatConfig.Plugin,
  parser: FlatConfig.Parser,
): FlatConfig.ConfigArray => [
  ...baseConfig(plugin, parser),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    name: "@quasarwork/eslint-config-gear/server",
  },
  {
    ignores: ["**/api/*", "**/web/*"],
  },
];
