const stateCreated = require('../../fixtures/state-created.json');
const stateCreatedMnemonic = require('../../fixtures/state-created-mnemonic-not-backup.json');
const stateCreatedMnemonicBackup = require('../../fixtures/state-created-mnemonic.json');

describe('Settings mnemonic', () => {
  it('goes to mnemonic confirm', () => {
    cy
      .viewport('iphone-se2')
      .visit('/settings', { state: stateCreatedMnemonic });
    const notification = cy.get('.notification-mnemonic-backup').should('be.visible');
    cy.matchImage({ screenshotConfig: { capture: 'viewport' } });
    notification.invoke('remove');

    cy.get('.list-item.mnemonic[href="/settings/mnemonic"]').click();
    cy.matchImage();
    cy.get('.ae-button').click();

    cy.location('pathname').should('equal', '/settings/mnemonic/show');
    cy.matchImage();

    cy.get('.ae-button').click();
    const modal = cy.get('.modal-plain').should('be.visible');
    cy.matchImage();
    modal.find('.ae-button').click();
    cy.location('pathname').should('equal', '/settings/mnemonic/show');

    cy.get('.progress').trigger('animationend', { force: true });
    cy.get('.ae-button').click();
    cy.location('pathname').should('equal', '/settings/mnemonic/confirm');
  });

  it('goes to confirmed', () => {
    cy
      .viewport('iphone-se2')
      .visit('/settings/mnemonic/confirm', {
        state: stateCreatedMnemonic,
        onBeforeLoad(contentWindow) {
          cy.stub(contentWindow.Math, 'random').callsFake(() => 0.3);
        },
      });
    cy.get('.notification-mnemonic-backup').invoke('remove');
    cy.matchImage();

    for (let i = 0; i < 12; i += 1) {
      cy.get('.button-mnemonic-word').eq(i).click();
    }
    cy.get('.ae-button').click();
    cy.matchImage();
    for (let i = 0; i < 12; i += 1) {
      cy.get('.ae-input-wrapper .button-mnemonic-word').eq(0).click();
    }

    stateCreatedMnemonic.accounts.hdWallet.encryptedWallet.mnemonic.split(' ').forEach((word) => {
      cy.get('.button-mnemonic-word:not([disabled])').contains(word).click();
    });
    cy.get('.ae-button').click();
    cy.location('pathname').should('equal', '/settings/mnemonic/confirmed');

    cy.getState().then((state) => expect(state).to.be.eql(stateCreatedMnemonicBackup));
  });

  it('removes mnemonic phrase', () => {
    cy
      .viewport('iphone-se2')
      .visit('/settings/mnemonic/confirmed', { state: stateCreatedMnemonicBackup });
    cy.matchImage();

    cy.get('.ae-button[href="/settings"]').should('be.visible');
    cy.get('.ae-button.primary').click();
    cy.location('pathname').should('equal', '/settings');

    cy.getState().then((state) => {
      expect(state).to.be.eql({ ...stateCreated, peerId: stateCreated.peerId });
    });
  });

  it('shows mnemonic deleted', () => {
    cy
      .viewport('iphone-se2')
      .visit('/settings', { state: stateCreated });

    cy.get('.list-item[href="/settings/mnemonic/deleted"]').click();
    cy.matchImage();
  });
});
