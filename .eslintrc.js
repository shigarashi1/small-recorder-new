module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "react-app",
    "eslint:recommended",
    // @typescript-eslint/eslint-plugin のおすすめルールを適用する
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    // Prettier と競合している ESLint のルールを無効にする
    "prettier/@typescript-eslint",
    // `eslint-config-prettier` と `eslint-plugin-prettier` を有効化する
    // ※ extends 配列の一番最後に配置すること
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  env: { browser: true, node: true, es6: true },
  rules: {
    // prettier
    // prettierのルールは効かなかったので、configに記載
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        singleQuote: true,
        useTabs: false,
        tabWidth: 2,
        semi: true,
        bracketSpacing: true,
        trailingComma: "all",
        arrowParens: "always"
      }
    ],
    // eslint
    "@typescript-eslint/explicit-function-return-type": "off",
    complexity: ["error", 4],
    quotes: ["error", "single", { avoidEscape: true }],
    "@typescript-eslint/semi": ["error", "always"],
    "no-var": "error"
  }
};
