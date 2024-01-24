describe('Transfer', () => {
  it('opens initial page, check tooltips', () => {
    cy
      .viewport('iphone-se2')
      .visit('/transfer', { login: true });
    cy.matchImage();
    cy.get('[href="/transfer/receive"]');
    cy.get('[href="/transfer/redeem"]');

    cy.get('.button-plain.right').click();
    cy.matchImage();

    cy.get('div.selection').each(($selection, idx) => {
      cy.wrap($selection).click(idx === 3 && { force: true });
      cy.matchImage();
    });

    cy.get('.tooltip button').click().should('not.exist');

    cy.get('.tooltips-modal').click();
    cy.get('.selection').should('not.exist');
  });

  it('opens receive', () => {
    cy
      .viewport('iphone-se2')
      .visit('/transfer/receive', { login: true });
    cy.matchImage();
    cy.get('[data-copy-on-click="ak_mUSniVx8jR3gCTTuXBLX4htTUvWJyWwxPYoEUeEVuS9KbUpT8"]');
  });

  it('opens redeem', () => {
    cy
      .viewport('iphone-se2')
      .visit('/transfer/redeem', { login: true });
    cy.matchImage({ screenshotConfig: { blackout: ['video'] } });
    // TODO: ensure redeem scanning works
    cy.get('.button-plain.left').click();
    cy.location('pathname').should('eq', '/transfer');
  });
});
