describe('Browser', () => {
  it('opens', () => {
    cy
      .viewport('iphone-se2')
      .visit('/browser', { login: true });
    cy.matchImage();
  });
});
