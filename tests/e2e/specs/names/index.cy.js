describe('Names', () => {
  it('shows initial screen', () => {
    cy
      .viewport('iphone-se2')
      .visit('/names', { login: true })
      .get('.list-item').should('length', 4)
      .should('be.visible');
    cy.matchImage();

    cy.get('[href="/names/ending-soonest"]').should('be.visible');
    cy.get('[href="/names/character-length"]').should('be.visible');
    cy.get('[href="/names/max-bid"]').should('be.visible');
    cy.get('[href="/names"]').should('be.visible');
    cy.get('[href="/names/personal/entertainment.chain"]').should('be.visible');
    cy.get('[href="/names/auction/engine.chain"]').should('be.visible');
    cy.get('[href="/names/new"]').should('be.visible');
  });

  [
    'ending-soonest', 'character-length/6', 'character-length/3', 'max-bid', 'auction/engine.chain',
  ].forEach((route) => {
    it(`shows ${route}`, () => {
      cy
        .viewport('iphone-se2')
        .visit(`/names/${route}`, { login: true })
        .get('.list-item').should('be.visible');
      cy.matchImage();
    });
  });

  it('shows personal name details', () => {
    cy
      .viewport('iphone-se2')
      .visit('/names/personal/entertainment.chain', { login: true })
      .get('.details-item').should('be.visible');
    cy.matchImage();
  });

  [
    'new',
    'bid/engine.chain', 'bid/engine.chain/amount',
    'personal/entertainment.chain/point', 'personal/entertainment.chain/transfer',
  ].forEach((route) => {
    it(`shows ${route}`, () => {
      cy
        .viewport('iphone-se2')
        .visit(`/names/${route}`, { login: true });
      cy.matchImage();
    });
  });
});
