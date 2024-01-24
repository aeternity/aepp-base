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
          sdkUrl: 'https://testnet.aeternity.io',
          accounts: {
            list: [{
              address: 'ak_mUSniVx8jR3gCTTuXBLX4htTUvWJyWwxPYoEUeEVuS9KbUpT8',
              source: { type: 'hd-wallet', idx: 0 },
            }],
            hdWallet: {
              encryptedWallet: {
                privateKey: {
                  type: 'Uint8Array',
                  data: [
                    133, 221, 179, 85, 188, 4, 39, 75, 56, 154, 162, 199, 27, 149, 97, 231,
                    20, 88, 102, 204, 181, 38, 18, 85, 206, 120, 73, 240, 71, 134, 92, 235,
                  ],
                },
                chainCode: {
                  type: 'Uint8Array',
                  data: [
                    117, 7, 32, 197, 56, 211, 83, 3, 37, 112, 22, 232, 37, 26, 143, 108,
                    175, 226, 168, 2, 187, 0, 150, 207, 159, 93, 31, 14, 56, 44, 74, 181,
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
