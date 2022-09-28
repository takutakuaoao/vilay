/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  // coverageProvider: 'v8',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  // testPathIgnorePatterns: [],
  transform: {
    '^.+\\.(ts|tsx)$': 'esbuild-jest',
  },
}
