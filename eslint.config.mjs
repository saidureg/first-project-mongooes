import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsparser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
      parser: tsparser,
    },
  },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'no-undefined': 'error',
      'prettier/prettier': 'error',
    },
    plugins: {
      prettier: eslintPluginPrettier, // Import Prettier plugin
    },
  },
  {
    ignores: ['.node_modules/*', 'dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
