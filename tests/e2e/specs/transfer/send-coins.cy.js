describe('Transfer: Send coins', () => {
  const account1 = 'ak_8eAGBq1jP4dLsmnmgnSzRBxSh5SU1AVsgbCwSQcXZVwwB6c1t';
  const account2 = 'ak_DNRWW4KcJyHed5b8fNizFkVb6zqykC6eFQokWgsBJLLyKdaiC';

  it('sends coins', () => {
    const testAmount = '0.0001';

    cy.viewport('iphone-se2')
      .visit('/transfer', { login: true })
      .get('.ae-account .balance')
      .invoke('text')
      .should('not.match', /\s0\s/)
      .as('oldBalance');
    cy.get('.list-item').contains('Send').click();

    cy.location('pathname').should('eq', '/transfer/send');
    cy.matchImage();
    cy.get('.list-item:first').click();

    cy.location('pathname').should('eq', `/transfer/send/${account2}`);
    cy.matchImage();
    cy.get('.ae-input-amount input').type(testAmount);
    cy.get('button').contains('Next').click();

    cy.location('pathname').should('eq', `/transfer/send/${account2}/${testAmount}`);
    const button = cy.get('button').contains('Confirm');
    cy.matchImage();
    button.click();

    cy.get('.notification-spend-success')
      .contains(testAmount)
      .get('@oldBalance')
      .then((oldBalance) =>
        cy.get('.ae-account .balance').invoke('text').should('not.equal', oldBalance),
      );
  });

  it('sends all coins', () => {
    cy.viewport('iphone-se2').visit(`/transfer/send/${account1}`, {
      login: true,
      state: { accounts: { activeIdx: 1 } },
    });
    cy.get('.ae-toolbar-button').click();
    cy.get('button').contains('Next').click();

    cy.location('pathname').should('contain', `/transfer/send/${account1}/`);
    cy.get('button').contains('Confirm').click();

    cy.get('.notification-spend-success').should('be.visible');
    cy.get('.ae-account .balance').invoke('text').should('match', /\s0\s/);
  });
});
