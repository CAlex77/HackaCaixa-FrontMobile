const inCI = !!process.env.CI;

module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|@expo/.*|expo-router|react-navigation|@react-native-community/.*))",
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  collectCoverage: false,
  collectCoverageFrom: [
    "src/services/**/*.{ts,tsx}",
    "src/utils/**/*.{ts,tsx}",
    "src/context/**/*.{ts,tsx}",
    "src/components/ThemeToggle.tsx",
    "!**/*.d.ts",
    "!**/__tests__/**",
    "!**/__mocks__/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "text",
    "text-summary",
    "html",
    "lcov",
    "json-summary",
    "json",
  ],

  coverageThreshold: inCI
    ? { global: { statements: 80, branches: 80, functions: 80, lines: 80 } }
    : { global: { statements: 0, branches: 0, functions: 0, lines: 0 } },
};
