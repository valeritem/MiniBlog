// @ts-nocheck
export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'mjs'],
  modulePathIgnorePatterns: ["<rootDir>/.stryker-tmp/"],


  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.mjs'],
  globalTeardown: '<rootDir>/tests/teardown.js',
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.mjs'],
  testTimeout: 30000,
};
