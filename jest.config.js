/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.ts",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.ts"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
