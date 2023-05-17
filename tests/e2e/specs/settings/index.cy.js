describe('Settings', () => {
  it('opens', () => {
    cy
      .viewport('iphone-se2')
      .visit('/settings', { login: true });
    cy.matchImage();

    cy.get('[href="/settings/network"]');
    cy.get('[href="/settings/currency"]');
    cy.get('[href="/settings/remote-connection"]');
    cy.get('[href="/settings/apps"]');
    cy.get('[href="/settings/security-courses"]');
    cy.get('[href="/settings/mnemonic/deleted"]');
    cy.get('[href="/settings/password"]');
    cy.get('[href="/settings/language"]');
    cy.get('[href="/settings/info"]');

    cy.get('[data-cy="reset"]').click();
    cy.get('.ae-button.secondary').click();
    cy.get('.overlay').should('not.exist');
    cy.get('[data-cy="reset"]').click();
    cy.get('.ae-button.primary').click();
    cy.get('.note').should('be.visible'); // reloaded to desktop
  });

  [
    'currency', 'remote-connection', 'apps', 'mnemonic/deleted', 'password', 'language', 'info',
  ].forEach((route) => {
    it(`opens ${route}`, () => {
      cy
        .viewport('iphone-se2')
        .visit(`/settings/${route}`, { login: true });
      cy.matchImage();
    });
  });
});
