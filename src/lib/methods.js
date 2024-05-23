import Swagger from 'swagger-client';

export async function resetConfirm() {
  await this.$store.dispatch('modals/open', {
    name: 'confirm',
    text: ENV_MOBILE_DEVICE
      ? this.$t('settings.reset.confirm')
      : this.$t('settings.reset.confirm-desktop'),
    primaryButtonText: this.$t('settings.reset.button'),
  });
  await this.$store.dispatch('reset');
}

export async function fetchAuctions(handler) {
  const { state: { sdk: sdkPromise }, getters: { currentNetwork } } = this.$store;
  const sdk = await Promise.resolve(sdkPromise);
  const res = await sdk.middleware2.api.getNamesAuctions({ limit: 100 });
  let { next } = res;
  handler(res.data);
  while (next) {
    const url = currentNetwork.middlewareUrl + next;
    const r = sdk.middleware2.responseInterceptor(
      // eslint-disable-next-line no-await-in-loop
      await Swagger.serializeRes(await fetch(url), url),
    ).body;
    handler(r.data);
    next = r.next;
  }
  handler();
}
