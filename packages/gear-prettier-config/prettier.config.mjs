/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "always",

  plugins: [
    "prettier-plugin-packagejson",
    "prettier-plugin-jsdoc",
    "@trivago/prettier-plugin-sort-imports",
  ],

  /**
   * @see https://github.com/trivago/prettier-plugin-sort-imports#usage
   */
  importOrder: ["^#styles(.*)$", "<THIRD_PARTY_MODULES>", "^#(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
};

export default config;
