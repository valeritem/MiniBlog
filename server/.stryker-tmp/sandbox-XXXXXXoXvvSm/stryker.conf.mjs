// @ts-nocheck
export default {
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  mutate: ['controllers/**/*.js', 'routes/**/*.js', 'utils/**/*.js', 'models/**/*.js'],
  jest: {
    enableFindRelatedTests: false,

    // Найважливіше місце
    projectType: 'custom',
    config: {
      testEnvironment: 'node',
      transform: {},
      extensionsToTreatAsEsm: ['.js', '.mjs'],
      moduleFileExtensions: ['js', 'mjs'],
    },
  },
};
