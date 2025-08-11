// @ts-check
import storybook from "eslint-plugin-storybook";
import eslint from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import sonarJs from "eslint-plugin-sonarjs";
import prettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  [
    globalIgnores(["dist", "storybook-static"]),
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        eslint.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        eslintReact.configs["recommended-type-checked"],
        reactHooks.configs["recommended-latest"],
        reactRefresh.configs.vite,
        sonarJs.configs.recommended,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          parser: tseslint.parser,
          tsconfigRootDir: import.meta.dirname,
          project: ["./tsconfig.app.json"],
        },
      },
      rules: {
        "@typescript-eslint/no-unnecessary-type-parameters": "off",
        "@eslint-react/no-use-context": "off",
        "@eslint-react/no-context-provider": "off",
      },
    },
  ],
  storybook.configs["flat/recommended"],
  prettier,
);
