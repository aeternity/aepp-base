import { prepare } from '../../utils';

describe('Migration 2: Build accounts array', () => {
  it('applicable', () => {
    prepare();
    const stateBeforeMigration = {
      migrations: {
        0: true,
        1: true,
      },
      rpcUrl: 'https://sdk-mainnet.aepps.com',
      selectedIdentityIdx: 2,
      addressBook: [],
      customNetworks: [],
      apps: [{
        host: 'example-aepp.origin.aepps.com',
        permissions: {
          accessToAccounts: [
            'ak_21tentxmY6ccVCLy2FH5wqF9ePq6jrXtWQ2sYs99AT89sMewy2',
          ],
        },
        bookmarked: true,
      }],
      cachedAppManifests: {
        'example-aepp.origin.aepps.com': {
          name: 'Example æpp',
          short_name: 'Example æpp',
          icons: [{
            src: '/icon.svg',
            type: 'image/svg',
          }],
          theme_color: '#008afc',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/index.html',
          fetchedAt: '2019-04-29T02:29:50.751Z',
        },
      },
      mobile: {
        keystore: {
          privateKey: {
            type: 'ArrayBuffer',
            data: [
              105, 110, 144, 104, 236, 222, 210, 86, 111, 173, 155, 164, 114, 238, 42, 75, 138,
              137, 176, 10, 78, 221, 27, 204, 167, 185, 57, 250, 139, 234, 76, 49,
            ],
          },
          chainCode: {
            type: 'ArrayBuffer',
            data: [
              175, 142, 79, 211, 12, 214, 32, 183, 191, 220, 132, 86, 114, 2, 218, 134, 68, 82,
              192, 47, 175, 18, 187, 214, 228, 190, 27, 134, 163, 20, 175, 115,
            ],
          },
          mac: {
            type: 'ArrayBuffer',
            data: [34, 217],
          },
          salt: {
            type: 'ArrayBuffer',
            data: [198, 39, 50, 44, 61, 222, 83, 176, 235, 6, 66, 57, 136, 130, 8, 19],
          },
        },
        accountCount: 3,
        followers: {},
        names: ['Main Account', 'Test 1', 'Test 2'],
      },
    };
    window.localStorage.vuex = JSON.stringify(stateBeforeMigration);
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
        expect(state.sdkUrl).equal(stateBeforeMigration.rpcUrl);
        expect(state.accounts.list.length).equal(stateBeforeMigration.mobile.names.length);
        expect(state.accounts.list[0].name).equal(stateBeforeMigration.mobile.names[0]);
        expect(state.accounts.activeIdx).equal(stateBeforeMigration.selectedIdentityIdx);
        expect(state.accounts.hdWallet.encryptedWallet).eql(stateBeforeMigration.mobile.keystore);
      });
  });
});
