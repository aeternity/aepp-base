module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['@babel/plugin-transform-async-to-generator', {
      module: 'bluebird',
      method: 'coroutine',
    }],
  ],
};
