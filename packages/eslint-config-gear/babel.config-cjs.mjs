export default {
  plugins: [
    "@babel/plugin-transform-export-namespace-from",
    [
      "@babel/plugin-transform-modules-commonjs",
      {
        strict: true,
      },
    ],
  ],
};
