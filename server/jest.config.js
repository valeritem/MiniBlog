export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'mjs'],
  modulePathIgnorePatterns: ['<rootDir>/.stryker-tmp/'],

  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.mjs'],
  globalTeardown: '<rootDir>/tests/teardown.js',
  testTimeout: 30000,
};
