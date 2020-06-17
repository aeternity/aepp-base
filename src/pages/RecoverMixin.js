import dizzySymbolEmoji from 'emoji-datasource-apple/img/apple/64/1f4ab.png';

export default {
  data() {
    return {
      dizzySymbolEmoji,
      mnemonic: '',
      error: false,
    };
  },
  methods: {
    async setMnemonic() {
      if (!await this.$validator.validateAll()) return;

      await this.$store.dispatch('accounts/hdWallet/createWallet', this.mnemonic);
    },
  },
};
