const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const tanstackQueryEslintPlugin = require('@tanstack/eslint-plugin-query');

module.exports = defineConfig([
  globalIgnores(['dist/*', '.expo/*', 'node_modules/*']),
  ...expoConfig,
  ...tanstackQueryEslintPlugin.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          bracketSameLine: true,
        },
        {
          usePrettierrc: true,
        },
      ],
    },
  },
]);
