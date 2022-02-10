/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const tsPreset = require('ts-jest/jest-preset');
// const rollupJest = require('rollup-jest');

module.exports = {
  ...tsPreset,
  // ...rollupJest,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'svelte'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
