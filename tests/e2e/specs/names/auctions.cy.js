describe('Auctions', () => {
  const name = `test-${Date.now().toString().slice(3, -3)}`;

  it('starts an auction', () => {
    cy.viewport('iphone-se2').visit('/names/new', { login: 'wallet-2' });
    cy.get('input').type(name);
    cy.get('.ae-button').click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.contains('Preclaim');
    cy.get('.ae-button-group .secondary').click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.matchImage();
    cy.get('.ae-button-group .secondary').click();

    cy.get('.notification')
      .contains('Claim for')
      .contains('name was successfully sent')
      .should('be.visible');
  });

  it('bids on auction', () => {
    cy.viewport('iphone-se2').visit(`/names/bid/${name}.chain/amount`, {
      login: 'wallet-2',
      state: { accounts: { activeIdx: 1 } },
    });
    cy.get('input').type(4);
    cy.get('.ae-button').click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.matchImage();
    cy.get('.ae-button-group .secondary').click();

    cy.get('.notification').contains('You bid on').contains('successfully').should('be.visible');

    cy.location('pathname').should('eq', `/names/auction/${name}.chain`);
  });
});
