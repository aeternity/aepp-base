describe('Browser', () => {
  it('opens', () => {
    cy
      .viewport('iphone-se2')
      .visit('/browser', { login: true });
    cy.getIframeBody().find('img').should('be.visible').should('length.gte', 3);
    cy.matchImage();
  });
});
