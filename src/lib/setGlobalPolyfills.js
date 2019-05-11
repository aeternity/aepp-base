import Promise from 'bluebird';

Promise.config({ cancellation: true });

Object.assign(window, {
  Int32Array,
  Uint8ClampedArray,
});
