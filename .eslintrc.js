module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    ENV_MOBILE_DEVICE: true,
  },
  ignorePatterns: ['dist', 'www'],
  extends: [
    'plugin:vue/recommended',
    'plugin:@intlify/vue-i18n/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': ['error', { properties: 'never' }],
    'vue/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'vue/component-name-in-template-casing': 'error',
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/no-boolean-default': 'error',
    'vue/no-restricted-syntax': 'error',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/require-direct-export': 'error',
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': 'error',
    'vue/v-on-function-call': 'error',
    '@intlify/vue-i18n/no-dynamic-keys': 'error',
    '@intlify/vue-i18n/no-unused-keys': 'error',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/no-autofocus': 'off',
    'vuejs-accessibility/alt-text': 'off',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  overrides: [{
    files: '**/__tests__/*',
    env: {
      jest: true,
    },
  }, {
    files: 'backend/**',
    rules: {
      'import/no-extraneous-dependencies': ['error', { packageDir: 'backend' }],
      'import/extensions': ['error', 'ignorePackages'],
    },
  }],
  settings: {
    'vue-i18n': {
      localeDir: './src/locales/*.json',
    },
  },
};
