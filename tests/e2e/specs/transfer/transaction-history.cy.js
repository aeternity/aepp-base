describe('Transfer: Transaction history', () => {
  it('shows list of transactions', () => {
    cy
      .viewport('iphone-se2')
      .visit('/transfer', { login: true })
      .get('.list-item')
      .contains('Transactions')
      .click();
    cy.location('pathname').should('eq', '/transfer/transactions');
    cy.get('.list-item-transaction:not(.pending)').should('length', 15);
    cy.matchImage();
  });

  it('shows transaction details', () => {
    cy.viewport('iphone-se2').visit('/transfer/transactions', { login: true });
    cy.get('.list-item-transaction:last').click();
    cy.location('pathname').should('include', '/transfer/transactions/details/th_');
    cy.matchImage();
  });
});
