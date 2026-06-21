import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: "space",
    quotes: "double",
    semi: true,
  },
  formatters: true,
  astro: true,
  typescript: true,
  rules: {
    "node/prefer-global/process": "off",
  },
});
