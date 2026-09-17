const JsdomEnvironment = require('jest-environment-jsdom');

/**
 * The default jsdom environment gives the test its own realm, whose `Uint8Array` is a different
 * constructor than the one of the node realm the sdk's `Buffer` comes from. `rlp`, which the
 * transaction builder serializes through, checks values with `instanceof Uint8Array` and rejects
 * every buffer the sdk hands it, so `buildTx` fails with "toBytes: received unsupported type
 * object" before any of the code under test runs.
 *
 * Point the realm at the node one for that single global. Only files that opt in with a
 * `@jest-environment` docblock use this, so the rest of the suite keeps the stock environment.
 */
module.exports = class SdkEnvironment extends JsdomEnvironment {
  constructor(...args) {
    super(...args);
    this.global.Uint8Array = Uint8Array;
  }
};
