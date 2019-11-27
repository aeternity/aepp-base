import Rpc from '@aeternity/aepp-sdk/es/rpc/server';

export default Rpc.compose({
  init(options, { stamp }) {
    const rpcMethods = [
      ...stamp.compose.deepConfiguration.Ae.methods,
      ...stamp.compose.deepConfiguration.Contract.methods,
    ];
    this.rpcMethods = {
      ...rpcMethods
        .map(m => [m, ({ params, origin }) => {
          const { host } = new URL(origin);
          const app = this.getApp(host);
          return Promise.resolve(this[m](...params, app));
        }])
        .reduce((p, [k, v]) => ({ ...p, [k]: v }), {}),
      ...this.rpcMethods,
    };
  },
});
