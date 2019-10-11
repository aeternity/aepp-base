export default ({
  init() {
    window.handleOpenURL = async (u) => {
      const url = new URL(u);
      const method = url.pathname;
      const callbackUrl = new URL(url.searchParams.get('callback'));
      url.searchParams.delete('callback');
      const params = [...url.searchParams.values()].map(p => JSON.parse(decodeURIComponent(p)));

      let result = 'denied';
      if (['http:', 'https:'].includes(callbackUrl.protocol)
        && ['address', 'sign', 'signTransaction'].includes(method)) {
        try {
          result = await this[method](...method === 'address'
            ? [this.getApp(new URL(callbackUrl.origin).host)]
            : params);
        } catch (e) {
          result = e;
        }
      }

      const deeplinkUrl = new URL(callbackUrl);
      deeplinkUrl.searchParams.set('result', JSON.stringify(result));
      window.open(deeplinkUrl, '_system');
    };
  },
});
