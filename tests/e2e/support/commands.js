// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('visit', (originalFn, url, {
  isDesktop, login, state, ...options
} = {}) => originalFn(
  url,
  {
    ...options,
    onBeforeLoad(contentWindow) {
      /* eslint-disable no-param-reassign */
      contentWindow.localStorage.vuex = login || state ? JSON.stringify(Cypress._.merge(
        login && {
          migrations: Object.fromEntries(Cypress._.times(6, (i) => [i, true])),
          accounts: {
            list: [{
              address: login === 'wallet-2'
                ? 'ak_s7gnBTaTm9n5iTFNVSnMBZMhrrBB42Q3BwpTdjoMuXhWyD5bN'
                : 'ak_8eAGBq1jP4dLsmnmgnSzRBxSh5SU1AVsgbCwSQcXZVwwB6c1t',
              source: { type: 'hd-wallet', idx: 0 },
            }, {
              address: login === 'wallet-2'
                ? 'ak_25sDUczTzeuBdWyx1Mvu7yYEhXA8BCJCXB3Gpqf2QHFGBHD7x1'
                : 'ak_DNRWW4KcJyHed5b8fNizFkVb6zqykC6eFQokWgsBJLLyKdaiC',
              source: { type: 'hd-wallet', idx: 1 },
            }],
            hdWallet: {
              encryptedWallet: {
                privateKey: {
                  type: 'Uint8Array',
                  data: login === 'wallet-2' ? [
                    164, 149, 84, 122, 149, 196, 223, 138, 199, 181, 109, 213, 57, 88, 2, 8,
                    121, 252, 27, 191, 76, 128, 160, 221, 22, 203, 246, 35, 229, 27, 123, 103,
                  ] : [
                    68, 182, 66, 150, 5, 164, 0, 122, 49, 168, 211, 214, 215, 21, 209, 252,
                    2, 87, 156, 34, 80, 47, 210, 39, 41, 57, 114, 132, 76, 133, 95, 152,
                  ],
                },
                chainCode: {
                  type: 'Uint8Array',
                  data: login === 'wallet-2' ? [
                    42, 13, 63, 81, 84, 2, 206, 219, 11, 177, 177, 44, 192, 40, 41, 217,
                    110, 46, 91, 134, 140, 180, 191, 115, 6, 101, 65, 65, 46, 209, 132, 189,
                  ] : [
                    239, 237, 223, 34, 108, 6, 11, 247, 234, 38, 22, 33, 129, 121, 252, 96,
                    45, 95, 234, 210, 221, 187, 26, 114, 144, 126, 68, 68, 154, 133, 75, 225,
                  ],
                },
              },
              mnemonicBackedUp: true,
            },
          },
        },
        {
          mobile: {
            skipAddingToHomeScreen: true,
          },
        },
        state,
      )) : null;
      const promise = new Promise(() => {});
      contentWindow.navigator.serviceWorker.register = () => promise;
      if (!isDesktop) {
        Object.defineProperty(contentWindow.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
        });
      }
      /* eslint-enable no-param-reassign */
      if (options.onBeforeLoad) options.onBeforeLoad(contentWindow);
    },
  },
));

Cypress.Commands.add('getState', () => JSON.parse(localStorage.vuex));

Cypress.Commands.add('stubCryptoRandom', () => {
  cy.window().then((win) => {
    cy.stub(win.crypto, 'getRandomValues').callsFake((uint8Array) => {
      for (let i = 0; i < uint8Array.length; i += 1) {
        uint8Array[i] = i; // eslint-disable-line no-param-reassign
      }
      return uint8Array;
    });
  });
});

Cypress.Commands.overwrite('matchImage', (originalFn, ...args) => {
  cy.get('body').then(($body) => {
    if ($body.find('.connection-status.connecting').length === 0) return;
    cy.get('.connection-status.connecting').should('not.exist');
  });
  originalFn(...args);
});

Cypress.Commands.add('getIframeBody', () => (
  cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
));
