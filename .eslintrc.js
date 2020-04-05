module.exports = {
  plugins: ["@typescript-eslint", "import"],
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
  env: { browser: true, node: true, es6: true, jest: true },
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
    "@typescript-eslint/semi": ["error", "always"],
    complexity: ["error", 4],
    quotes: ["error", "single", { avoidEscape: true }],
    // turn on errors for missing imports
    "import/no-unresolved": "error",
    "no-var": "error",
    "no-console": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: ["ramda", "date-fns"],
        patterns: ["!@/library/ramda", "!date-fns/*"]
      }
    ]
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      // use <root>/tsconfig.json
      typescript: {
        alwaysTryTypes: true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
      alias: {
        map: [
          ["@Components", "./src/presentation/components"],
          ["@Events", "./src/presentation/events"],
          ["@Selector", "./src/application/selector"],
          ["@DomainModels", "./src/domain/models"],
          ["@", "./src"]
        ],
        extensions: [".ts", ".tsx"]
      }
    }
  }
};
