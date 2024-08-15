import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2021,
      parserOptions: {
        sourceType: "module",
        project: true,
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      eslintPluginPrettier,
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
      "**/*.json",
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
      "**/web/*",
      "**/extensions/*",
    ],
  },
  {
    rules: {
      // disabled because effect-ts needs to be able extends schema interfaces
      // e.g. interface Foo extends Schema.Type<typeof Foo> {}
      "@typescript-eslint/no-empty-interface": "off",

      // disabled because effect-ts needs to be able to throw Data.TaggedError
      // e.g. export class FromUnknownThrownError extends Data.TaggedError(
      "@typescript-eslint/only-throw-error": "off",

      // disabled because gadget.dev generated shopify schema are sometimes
      // inaccurate regarding nullable fields
      "@typescript-eslint/no-non-null-assertion": "off",

      // disabled because gadget.dev internal api return data of type any
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
);

export default config;
