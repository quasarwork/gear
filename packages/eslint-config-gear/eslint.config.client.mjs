import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

import eslintConfigGearBase from "./eslint.config.base.mjs";

const config = tseslint.config(
  {
    name: "Gear (client)",
  },
  ...eslintConfigGearBase,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      eslintPluginReact,
      eslintPluginReactHooks,
      eslintPluginReactRefresh,
    },
  },
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx",
      "**/*.mjs",
      "**/*.cjs",
    ],
  },
  {
    ignores: [
      "**/.*",
      "**/.git/*",
      "**/dist/*",
      "**/.vscode/*",
      "**/.svn/*",
      "**/.hg/*",
      "**/node_modules/*",
      "**/.gadget/*",
      "*.gadget.ts",
      "**/api/*",
      "**/extensions/*",
    ],
  },
);

console.log(config);

export default config;
