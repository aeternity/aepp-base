// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@frsource/cypress-plugin-visual-regression-diff';

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/simple/price*',
    },
    {
      aeternity: {
        usd: 0.0200868,
        eur: 0.01835634,
        btc: 4.44868e-7,
        gbp: 0.01578517,
        aud: 0.02998522,
        cny: 0.142835,
      },
    },
  );
});
