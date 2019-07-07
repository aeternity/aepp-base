describe('Migration 3: Set mnemonic backed up', () => {
  it('applicable', () => {
    window.localStorage.vuex = JSON.stringify({
      migrations: {
        0: true,
        1: true,
        2: true,
      },
      accounts: {
        list: [{
          address: 'ak_2swhLkgBPeeADxVTAVCJnZLY5NZtCFiM93JxsEaMuC59euuFRQ',
          name: 'Main Account',
          source: {
            idx: 0,
            type: 'hd-wallet',
          },
        }],
        hdWallet: {
          encryptedWallet: {
            privateKey: {
              type: 'ArrayBuffer',
              data: [
                99, 4, 219, 158, 15, 198, 201, 236, 138, 202, 221, 189, 219, 87, 203, 15, 184,
                28, 207, 134, 243, 213, 211, 141, 156, 20, 132, 145, 136, 28, 109, 9,
              ],
            },
            chainCode: {
              type: 'ArrayBuffer',
              data: [
                144, 218, 66, 92, 180, 54, 87, 114, 131, 132, 143, 226, 224, 173, 28, 197, 114,
                142, 124, 11, 21, 5, 172, 88, 155, 166, 49, 135, 6, 41, 82, 54,
              ],
            },
            mac: {
              type: 'ArrayBuffer',
              data: [96, 104],
            },
            salt: {
              type: 'ArrayBuffer',
              data: [163, 236, 16, 158, 177, 79, 169, 173, 130, 16, 227, 229, 16, 184, 186, 172],
            },
          },
        },
      },
    });
    cy
      .viewport('iphone-5')
      .visit('/login')
      .get('input[type=password]').type('1234')
      .get('button')
      .contains('Log in')
      .click()
      .url()
      .should('contain', '/transfer')
      .then(() => {
        const state = JSON.parse(localStorage.vuex);
        expect(state.accounts.hdWallet.mnemonicBackedUp).equal(true);
      });
  });
});
