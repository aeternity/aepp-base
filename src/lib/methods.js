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
  const { middleware } = this.$store.getters;
  const res = await middleware.getNamesAuctions({ limit: 100 });
  let { next } = res;
  handler(res.data);
  while (next) {
    const r = middleware.getNamesAuctions({ overridePath: next });
    handler(r.data);
    next = r.next;
  }
  handler();
}
