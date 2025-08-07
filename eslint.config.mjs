// @ts-check
import stylistic from "@stylistic/eslint-plugin"
import simpleImportSort from "eslint-plugin-simple-import-sort"

import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  plugins: { "@stylistic": stylistic },
  rules: {
    "@stylistic/array-bracket-newline": [
      "error",
      { multiline: true, minItems: 3 },
    ],
    "@stylistic/array-bracket-spacing": [
      "error",
      "always",
      { arraysInArrays: false, objectsInArrays: false },
    ],
    "@stylistic/array-element-newline": [
      "error",
      { multiline: true, minItems: 2 },
    ],
    "@stylistic/brace-style": [
      "error",
      "1tbs",
      { allowSingleLine: true },
    ],
    "@stylistic/comma-dangle": [
      "error",
      "always-multiline",
    ],
    "@stylistic/eol-last": [
      "error",
      "always",
    ],
    "@stylistic/function-call-argument-newline": [
      "error",
      "consistent",
    ],
    "@stylistic/function-paren-newline": [
      "error",
      { minItems: 3 },
    ],
    "@stylistic/max-len": [
      "error",
      {
        code: 120, ignoreStrings: true, ignoreTemplateLiterals: true,
      },
    ],
    "@stylistic/no-floating-decimal": "error",
    "@stylistic/object-curly-newline": [
      "error",
      { minProperties: 3, multiline: true },
    ],
    "@stylistic/one-var-declaration-per-line": [
      "error",
      "always",
    ],
    "@stylistic/quotes": [
      "error",
      "double",
    ],
    "@stylistic/indent": [
      "error",
      2,
    ],
  },
},
{
  plugins: { "simple-import-sort": simpleImportSort },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
})
