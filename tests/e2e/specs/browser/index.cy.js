describe('Browser', () => {
  const migrateDetailsUrl = '/browser/migrate.aeternity.com';

  it('opens', () => {
    cy
      .viewport('iphone-se2')
      .visit('/browser', { login: true });
    cy.get('.ae-link.list-item img').should('have.length.at.least', 4);
    cy.get('.ae-link.list-item[href="/browser/migrate.aeternity.com"]').should('be.visible');
    cy.matchImage();
  });

  it('opens aepp details', () => {
    cy
      .viewport('iphone-se2')
      .visit(migrateDetailsUrl, { login: true });
    cy.get('main header img').should('have.length', 1);
    cy.matchImage();
  });
});
