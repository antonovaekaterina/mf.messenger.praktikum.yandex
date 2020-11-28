module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  resolver: 'jest-ts-webcompat-resolver',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
      '\\.(jpg|jpeg|png|svg|ttf)$': '<rootDir>/mocks/fileMock.js',
      '\\.(scss)$': '<rootDir>/mocks/styleMock.js'
  }
};