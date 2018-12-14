module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-name-in-template-casing': 'kebab-case',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [{
    files: '**/__tests__/*',
    env: {
      jest: true,
    },
  }],
};
