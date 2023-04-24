const packagesToTranspile = [
  'lodash-es',
  'emoji-datasource-apple',
  '@aeternity/aepp-sdk',
  '@aeternity/hd-wallet',
  'register-service-worker',
];

module.exports = {
  setupFiles: ['jest-canvas-mock', '<rootDir>/config/jest/globals.js'],
  moduleFileExtensions: [
    'js',
    'mjs',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.m?jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTranspile.join('|')})/)`,
  ],
  moduleNameMapper: {
    '^.*\\.svg\\?icon-component$': '<rootDir>/config/jest/EmptySvg.vue',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)',
    '**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
};
