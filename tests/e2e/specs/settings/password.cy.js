const stateEncrypted = require('../../fixtures/state-encrypted.json');
const stateEncryptedTest = require('../../fixtures/state-encrypted-test.json');
const stateCreated = require('../../fixtures/state-created.json');

const password = 'Aa0?!-';

describe('Settings password', () => {
  it('sets password', () => {
    cy.viewport('iphone-se2').visit('/settings/password', { state: stateCreated });
    cy.matchImage();

    cy.get('.list-item').click();
    cy.matchImage();

    cy.get('input[type=password]').eq(0).type('123');
    cy.get('input[type=password]').eq(1).type('?');
    cy.matchImage();

    cy.get('input[type=password]').eq(0).clear().type(password);
    cy.get('input[type=password]').eq(1).clear().type(password);
    cy.stubCryptoRandom();
    cy.get('.ae-button').click();
    cy.get('.list-item-button').should('be.visible');
    cy.get('a[href="/settings/password/set"]').should('be.visible');
    cy.matchImage();

    cy.getState().then((state) => expect(state).to.be.eql(stateEncrypted));
  });

  it('logins and removes password', () => {
    cy.viewport('iphone-se2').visit('/settings/password', { state: stateEncrypted });
    cy.matchImage();

    cy.get('input[type=password]').type('test');
    cy.get('.ae-button').click();
    cy.get('a[href="/recover"]').should('be.visible');
    cy.matchImage();

    cy.get('input[type=password]').clear().type(password);
    cy.get('.ae-button').click();
    cy.get('.list-item-button').click();
    cy.matchImage();

    cy.get('input[type=password]').type(password);
    cy.get('.ae-button').click();

    cy.getState().then((state) => {
      const obj = Cypress._.cloneDeep(stateCreated);
      // TODO: shouldn't convert from Uint8Array to ArrayBuffer
      obj.accounts.hdWallet.encryptedWallet.privateKey.type = 'ArrayBuffer';
      obj.accounts.hdWallet.encryptedWallet.chainCode.type = 'ArrayBuffer';
      expect(state).to.be.eql(obj);
    });
  });

  function login(path) {
    cy.viewport('iphone-se2').visit(path, { state: stateEncrypted });
    cy.get('input[type=password]').type(password);
    cy.get('.ae-button').click();
  }

  it('changes password', () => {
    login('/settings/password/set');
    cy.matchImage();
    cy.get('input[type=password]').eq(0).type(password);
    cy.get('input[type=password]').eq(1).type('test');
    cy.get('input[type=password]').eq(2).type('test');
    cy.stubCryptoRandom();
    cy.get('.ae-button').click();
    cy.location('pathname').should('equal', '/settings/password');

    cy.getState().then((state) => expect(state).to.be.eql(stateEncryptedTest));
  });

  it('can log out', () => {
    login('/settings');
    const card = cy.get('.ae-card.maximum').eq(1);
    card.matchImage();
    card.get('.list-item.logout').click();
    cy.location('pathname').should('equal', '/login');
  });

  it('shows login at intro screen', () => {
    cy.viewport('iphone-se2').visit('/', { state: stateEncrypted });
    cy.location('pathname').should('equal', '/login');
    cy.get('.ae-link').click();
    cy.matchImage();

    cy.get('[data-cy="reset"]').click();
    cy.get('.ae-button.primary').click();
    cy.get('.note').should('be.visible'); // reloaded to desktop
  });

  it('opens onboarding without password', () => {
    cy.viewport('iphone-se2').visit('/onboarding', { state: stateEncrypted });
    cy.location('pathname').should('equal', '/onboarding');
  });
});
