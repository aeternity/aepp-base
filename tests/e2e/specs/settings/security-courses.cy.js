describe('Security courses', () => {
  it('walks through', () => {
    cy.viewport('iphone-se2').visit('/settings/security-courses', { login: true });
    cy.matchImage();

    cy.get('.list-item.ae-link').first().click();
    cy.matchImage();

    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="next"]').click();
      cy.matchImage();
    }

    cy.get('[href="https://www.ledger.com"]');
    cy.get('[href="/vault/choose"]');

    cy.get('[data-cy="skip"]').click();
    cy.matchImage();
    cy.location('pathname').should('eq', '/settings/security-courses');
  });

  it('opens at specific step and skips', () => {
    cy.viewport('iphone-se2').visit('/settings/security-courses', { login: true });
    cy.get('.list-item.ae-link:nth-child(2)').click();
    cy.location('pathname').should('eq', '/settings/security-courses/bank');
    cy.get('[data-cy="skip"]').click();
    cy.location('pathname').should('eq', '/settings/security-courses');
    cy.get('.list-item.ae-link:nth-child(2)').should('have.class', 'checked');
  });
});
