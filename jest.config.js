const packagesToTranspile = [
  'lodash-es',
  'emoji-datasource-apple',
  '@aeternity/aepp-sdk',
  '@aeternity/hd-wallet',
  'register-service-worker',
];

module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock', '<rootDir>/config/jest/globals.js'],
  moduleFileExtensions: [
    'js',
    'mjs',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.m?jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTranspile.join('|')})/)`,
  ],
  moduleNameMapper: {
    '^.*\\.svg\\?icon-component$': '<rootDir>/config/jest/EmptySvg.vue',
    // https://github.com/jestjs/jest/issues/10422
    '^@swagger-api/apidom-reference/parse/parsers/binary$': '@swagger-api/apidom-reference/cjs/parse/parsers/binary/index-browser.cjs',
    '^@swagger-api/apidom-reference/(.*)/strategies/openapi-3-1$': '@swagger-api/apidom-reference/cjs/$1/strategies/openapi-3-1/index.cjs',
    '^@swagger-api/apidom-reference/dereference/strategies/openapi-3-1/selectors/(.*)$': '@swagger-api/apidom-reference/cjs/dereference/strategies/openapi-3-1/selectors/$1/index.cjs',
    '^@swagger-api/apidom-reference/(.*)$': '@swagger-api/apidom-reference/cjs/$1.cjs',
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
