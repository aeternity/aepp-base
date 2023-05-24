// eslint-disable-next-line import/prefer-default-export
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
