{
  "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
  "react",
  "import",
  "@typescript-eslint"
],
    "extends": [
  "eslint:recommended",
  "plugin:@typescript-eslint/eslint-recommended",
  "plugin:@typescript-eslint/recommended"
],
    "rules": {
  "comma-dangle": ["error", {
    "arrays": "always-multiline",
    "objects": "always-multiline",
    "imports": "always-multiline",
    "exports": "always-multiline",
    "functions": "always-multiline"
  }],
      "max-len": [
    "warn",
    {
      "code": 120,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreComments": true
    }
  ],
      "semi": ["error", "always"],
      "quote-props": ["error", "as-needed"],
      "arrow-body-style": 2,
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "generator-star-spacing": [1, "after"],
      "quotes": ["error", "single"],
      "jsx-quotes": ["error", "prefer-single"],
      "react/no-array-index-key": 0,
      "react/jsx-curly-spacing": [2, {"when": "never", "allowMultiline": false}],
      "react/jsx-closing-bracket-location": [2, "tag-aligned"],
      "no-var": "error",
      "no-multi-spaces": "error",
      "no-trailing-spaces": "error",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
      "import/extensions": 0,
      "import/newline-after-import": ["error", { "count": 1 }],
      "object-shorthand": 2,
      "object-curly-newline": ["error", { "multiline": true }],
      "object-curly-spacing": ["error", "always"],
      "object-property-newline": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off"
}
}