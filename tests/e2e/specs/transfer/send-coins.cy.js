describe('Transfer: Send coins', () => {
  const account1 = 'ak_mUSniVx8jR3gCTTuXBLX4htTUvWJyWwxPYoEUeEVuS9KbUpT8';
  const account2 = 'ak_22kbscYf1TbjcxXaZYCgFxbT6pASb9guJC8n7SviSvMC1cg53m';

  it('sends coins', () => {
    const testAmount = '0.0001';

    cy
      .viewport('iphone-se2')
      .visit('/transfer', { login: true })
      .get('.ae-account .balance', { timeout: 10000 })
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

    cy.get('.notification-spend-success', { timeout: 24000 })
      .contains(testAmount)
      .get('@oldBalance')
      .then((oldBalance) => cy
        .get('.ae-account .balance')
        .invoke('text')
        .should('not.equal', oldBalance));
  });

  it('sends all coins', () => {
    cy
      .viewport('iphone-se2')
      .visit(`/transfer/send/${account1}`, { login: true, state: { accounts: { activeIdx: 1 } } });
    cy.get('.ae-toolbar-button').click();
    cy.get('button').contains('Next').click();

    cy.location('pathname').should('contain', `/transfer/send/${account1}/`);
    cy.get('button').contains('Confirm').click();

    cy.get('.notification-spend-success', { timeout: 24000 }).should('be.visible');
    cy.get('.ae-account .balance').invoke('text').should('match', /\s0\s/);
  });
});
