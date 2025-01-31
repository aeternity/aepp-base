describe('Browser', () => {
  it('opens', () => {
    cy
      .viewport('iphone-se2')
      .visit('/browser', { login: true });
    cy.get('.progress-fake').should('not.exist');
    // TODO: enable after fixing https://docs.aeternity.com/aepp-base-home-page
    // cy.getIframeBody()
    //   .find('img')
    //   .should('be.visible')
    //   .and('length', 4)
    //   .and(($imgs) => Array.from($imgs).forEach((img) => {
    //     expect(img.naturalWidth).to.be.greaterThan(0);
    //   }));
    cy.matchImage();
  });
});
