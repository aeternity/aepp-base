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
  let page = await middleware.getNamesAuctions({ limit: 100 });
  handler(page.data);
  while (page.nextPath) {
    page = await page.next();
    handler(page.data);
  }
  handler();
}
