import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsparser from '@typescript-eslint/parser';

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser, parser: tsparser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undefined': 'error',
    },
    globals: {
      process: 'readonly',
    },
  },
  {
    ignores: ['node_modules/', 'dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

module.exports = [eslintPluginPrettierRecommended];
