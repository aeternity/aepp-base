export default {
  props: {
    accountType: {
      type: String,
      validator: (value) => ['hd-wallet-desktop', 'hd-wallet', 'ledger'].includes(value),
      default: 'local',
    },
  },
};
