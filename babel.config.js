module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    ['@babel/plugin-transform-async-to-generator', {
      module: 'bluebird',
      method: 'coroutine',
    }],
  ],
};
