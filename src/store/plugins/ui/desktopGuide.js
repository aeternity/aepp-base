import { i18n } from './languages';

export default (store) => {
  store.watch(
    ({ accounts: { list } }) => list.some(({ source: { type } }) => type !== 'ledger'),
    async (hasNotLedgerAccounts) => {
      if (!hasNotLedgerAccounts || !store.state.desktop.showGuideOnStartup) return;
      await store.dispatch('modals/open', {
        name: 'alert',
        text: i18n.t('guide-desktop'),
      });
      store.commit('markGuideAsRead');
    },
    { immediate: true },
  );
};
