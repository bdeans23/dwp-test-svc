module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts"
  ],
  coveragePathIgnorePatterns: [
    'app.ts',
    'logger.ts',
    'server.ts'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/*/*.spec.(ts|tsx|js)'
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src/$1',
    '^@test(.*)$': '<rootDir>/test/$1',
  }
};
