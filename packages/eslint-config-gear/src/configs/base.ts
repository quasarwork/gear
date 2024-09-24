import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettier from "eslint-plugin-prettier";
// import eslintPluginTsDoc from "eslint-plugin-tsdoc";
import tseslint from "typescript-eslint";

export default (
  plugin: FlatConfig.Plugin,
  parser: FlatConfig.Parser,
): FlatConfig.ConfigArray => [
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPerfectionist.configs["recommended-natural"],
  {
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
    },
    name: "@quasarwork/eslint-config-gear/base",
    plugins: {
      "@typescript-eslint": plugin,
      eslintPluginPrettier,
      // eslintPluginTsDoc,
    },
    rules: {
      // disabled because effect-ts needs to be able to extend schema interfaces
      // e.g. interface Foo extends Schema.Type<typeof Foo> {}
      "@typescript-eslint/no-empty-interface": "off",

      // disabled because effect-ts needs to be able to throw Data.TaggedError
      // inaccurate regarding nullable fields
      "@typescript-eslint/no-non-null-assertion": "off",

      // disabled because gadget.dev generated shopify schema are sometimes
      // disabled because gadget.dev internal api return data of type any
      "@typescript-eslint/no-unsafe-assignment": "off",

      // e.g. export class FromUnknownThrownError extends Data.TaggedError(
      "@typescript-eslint/only-throw-error": "off",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    ignores: [
      "**/.*",
      "**/.git/**/*",
      "**/dist/**/*",
      "**/build/**/*",
      "**/.vscode/**/*",
      "**/.idea/**/*",
      "**/.svn/**/*",
      "**/.hg/**/*",
      "**/node_modules/**/*",
      "**/.gadget/**/*",
      "*.gadget.ts",
      "**/types/**/*",
    ],
  },
];
