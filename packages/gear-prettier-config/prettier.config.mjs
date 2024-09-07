/**
 * @type {import("prettier").Config}
 *
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "always",

  plugins: ["prettier-plugin-packagejson", "prettier-plugin-jsdoc"],

  jsdocSeparateReturnsFromParam: true,
  jsdocSeparateTagGroups: true,
  jsdocPreferCodeFences: true,
  tsdoc: true,
};

export default config;
