import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

import eslintConfigGear from "./base.mjs";

const config = tseslint.config(
  ...eslintConfigGear,
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

export default config;
