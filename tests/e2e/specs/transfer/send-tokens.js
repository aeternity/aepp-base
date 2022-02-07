describe('Transfer: Send tokens', () => {
  it('sends tokens', () => {
    const testReceiverAddress = 'ak_22kbscYf1TbjcxXaZYCgFxbT6pASb9guJC8n7SviSvMC1cg53m';
    const testAmount = '0.0001';

    cy
      .viewport('iphone-5')
      .visit('/transfer', { login: true })
      .get('.ae-account .balance', { timeout: 10000 })
      .invoke('text')
      .should('not.match', /\s0\s/)
      .as('oldBalance')

      .get('.list-item')
      .contains('Send')
      .click()

      .url()
      .should('contain', '/transfer/send')
      .get('.ae-input-address textarea')
      .get('.list-item:first')
      .click()

      .url()
      .should('contain', `/transfer/send/${testReceiverAddress}`)
      .get('.ae-input-amount input')
      .type(testAmount)
      .get('button')
      .contains('Next')
      .click()

      .url()
      .should('contain', `/transfer/send/${testReceiverAddress}/${testAmount}`)
      .get('button')
      .contains('Confirm')
      .click()

      .get('.notification-spend-success', { timeout: 24000 })
      .contains(testAmount)
      .get('@oldBalance')
      .then((oldBalance) => cy
        .get('.ae-account .balance')
        .invoke('text')
        .should('not.equal', oldBalance));
  });
});
