describe('Transfer: Transaction history', () => {
  it('shows list of transactions and transaction details', () => {
    cy
      .viewport('iphone-5')
      .visit('/transfer', { login: true })
      .get('.list-item')
      .contains('Transactions')
      .click()
      .get('.list-item-transaction:not(.pending)', { timeout: 10000 })
      .should('length', 15)
      .get('.list-item-transaction:last')
      .click()
      .get('.details-item')
      .should('contain', 'Status');
  });
});
