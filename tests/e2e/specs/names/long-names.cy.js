describe('Long names', () => {
  it('extends', () => {
    cy.viewport('iphone-se2').visit('/names/personal/investigation.chain', { login: 'wallet-2' });
    cy.get('.ae-button').contains('Extend name').click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.matchImage();
    cy.get('.ae-button-group .secondary').click();

    let expiresOld;
    const selector = '.details-row:contains("Expires at height") .value';
    cy.get(selector).then(($value) => {
      expiresOld = $value.text();
    });
    cy.get(selector).should(
      ($value) => {
        expect(+$value.text()).to.be.greaterThan(+expiresOld);
      },
      { timeout: 5000 },
    );
  });

  it('set pointer', () => {
    cy.viewport('iphone-se2').visit('/names/personal/investigation.chain/point', {
      login: 'wallet-2',
    });
    cy.get('.list-item').first().click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.matchImage();
    cy.get('.ae-button-group .secondary').click();

    cy.get('.notification').contains('was successfully pointed').should('be.visible');
  });

  it('transfer', () => {
    cy.viewport('iphone-se2').visit('/names/personal/investigation.chain/transfer', {
      login: 'wallet-2',
    });
    cy.get('.list-item').first().click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.matchImage();
    cy.get('.ae-button-group .secondary').click();

    cy.get('.notification').contains('was successfully transferred').should('be.visible');
  });

  it('sets default name', () => {
    cy.viewport('iphone-se2').visit('/names/personal/investigation.chain', { login: 'wallet-2' });
    cy.get('.ae-button:contains("Set as a default name")').click().should('be.disabled');

    cy.get('.ae-identicon').click();
    cy.get('.account-switcher-modal:contains("investigation.chain")').should('be.visible');
  });

  it('register name', () => {
    const name = `test-${Date.now().toString().slice(0, -3)}`;
    cy.viewport('iphone-se2').visit('/names/new', { login: 'wallet-2' });
    cy.get('input').type(`${name}{moveToStart}${'{rightArrow}'.repeat(4)}-`);
    cy.get('.ae-button').click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.matchImage();
    cy.get('.ae-button-group .secondary').click();

    cy.get('.turtle-rabbit').should('be.visible');
    cy.get('.ae-button-group .secondary').click();
    cy.get('.notification')
      .contains(`${name}.chain was successfully registered`)
      .should('be.visible');
  });
});
