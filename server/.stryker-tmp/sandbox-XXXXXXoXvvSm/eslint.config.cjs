// @ts-nocheck
module.exports = [
  { ignores: ['node_modules/**', 'dist/**', 'build/**'] },

  // правила для JS файлов
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'no-console': 'off',
      'prettier/prettier': 'error',
    },
  },
];
