import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
// @ts-expect-error eslint-plugin-react is not typed
import eslintPluginReact from "eslint-plugin-react";
// @ts-expect-error eslint-plugin-react is not typed
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error eslint-plugin-react is not typed
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

import baseConfig from "./base.js";

export default (
  plugin: FlatConfig.Plugin,
  parser: FlatConfig.Parser,
): FlatConfig.ConfigArray => [
  ...baseConfig(plugin, parser),
  {
    name: "@quasarwork/eslint-config-gear/client",
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      eslintPluginReact,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      eslintPluginReactHooks,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      eslintPluginReactRefresh,
    },
    ignores: ["**/api/*", "**/extensions/*"],
  },
];
