export default {
  testRunner: "jest",
  coverageAnalysis: "perTest",
  mutate: [
    "controllers/**/*.js",
    "routes/**/*.js",
    "utils/**/*.js",
    "models/**/*.js"
  ],
  jest: {
    enableFindRelatedTests: false,
    projectType: "custom",
    config: {
      testEnvironment: "node",
      transform: {},
      moduleFileExtensions: ["js", "mjs"],
    }
  }
};
