export default {
  migrate(state) {
    if (!process.env.IS_MOBILE_DEVICE) return state;
    const newState = { ...state };
    newState.accounts.hdWallet.mnemonicBackedUp = !state.accounts.hdWallet.encryptedWallet.mnemonic;
    return newState;
  },
};
