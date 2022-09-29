const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  verbose: true,
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform
};
