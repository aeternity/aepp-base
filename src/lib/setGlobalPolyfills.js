import Promise from 'bluebird';

Promise.config({
  cancellation: true,
  warnings: {
    wForgottenReturn: false,
  },
});

Object.assign(window, {
  Int32Array,
  Uint8ClampedArray,
});
