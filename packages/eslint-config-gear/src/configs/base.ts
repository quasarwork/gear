import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default (
  plugin: FlatConfig.Plugin,
  parser: FlatConfig.Parser,
): FlatConfig.ConfigArray => [
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: "@quasarwork/eslint-config-gear/base",
    languageOptions: {
      parser,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": plugin,
      eslintPluginPrettier,
    },
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
