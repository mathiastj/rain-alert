module.exports = {
  preset: 'jest-puppeteer',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['^.+\\.helper\\.test\\.ts$'],
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/types/**',
    '!**/src/test/**',
    '!**/src/**.test.ts',
    '!**/bin/**.test.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
}
