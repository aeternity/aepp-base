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

Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => originalFn(
  url,
  Object.assign({}, options, {
    onBeforeLoad(contentWindow) {
      const { login, state } = options;
      /* eslint-disable no-param-reassign */
      contentWindow.localStorage.vuex = login || state ? JSON.stringify(Cypress._.merge(
        login && {
          migrations: Cypress._.fromPairs(Cypress._.times(4, i => [i, true])),
          sdkUrl: 'https://node.testnet.aeternal.io',
          accounts: {
            list: [{
              name: 'Main Account',
              address: 'ak_2swhLkgBPeeADxVTAVCJnZLY5NZtCFiM93JxsEaMuC59euuFRQ',
              source: { type: 'hd-wallet', idx: 0 },
            }],
            hdWallet: {
              encryptedWallet: {
                privateKey: {
                  type: 'Uint8Array',
                  data: [
                    35, 89, 107, 163, 240, 13, 124, 66, 174, 5, 70, 165, 208, 105, 104, 251,
                    224, 249, 105, 185, 28, 20, 178, 8, 138, 20, 195, 45, 192, 188, 151, 115,
                  ],
                },
                chainCode: {
                  type: 'Uint8Array',
                  data: [
                    93, 146, 248, 228, 66, 136, 66, 34, 222, 246, 255, 233, 145, 141, 251, 6,
                    125, 198, 138, 162, 215, 103, 155, 246, 132, 140, 154, 234, 89, 64, 209, 3,
                  ],
                },
              },
              mnemonicBackedUp: true,
            },
          },
        },
        state,
      )) : null;
      const promise = new Promise(() => {});
      contentWindow.navigator.serviceWorker.register = () => promise;
      /* eslint-enable no-param-reassign */
      if (options.onBeforeLoad) options.onBeforeLoad(contentWindow);
    },
  }),
));

Cypress.Commands.add('getState', () => JSON.parse(localStorage.vuex));
