function openRoot() {
  cy
    .viewport('iphone-se2')
    .visit('/')
    .get('[data-cy="skip"]')
    .click();
}

describe('Create or recover account', () => {
  it('creates new account, goes to security courses', () => {
    cy
      .viewport('iphone-se2')
      .visit('/')
      .matchImage();

    cy.get('[data-cy="skip"]').click();
    cy.matchImage();

    cy.get('[data-cy="create"]').click();
    cy.get('.security-course-modal > .modal-plain').should('be.visible');
    cy.matchImage({ screenshotConfig: { blackout: ['.ae-identicon'] } });

    cy.get('[data-cy="security-course"]').click();
    cy.location('pathname').should('eq', '/settings/security-courses/intro');
    const notification = cy.get('.notification-mnemonic-backup').should('be.visible');
    cy.matchImage();
    notification.invoke('remove');

    cy.get('[data-cy="skip"]').click();
    cy.matchImage();
    cy.location('pathname').should('eq', '/settings/security-courses');
  });

  it('recovers an account, goes to transfer', () => {
    openRoot();

    cy.get('[data-cy="recover"]').click();
    cy.matchImage();
    cy.get('.ae-link[href="/"]').click();
    cy.location('pathname').should('eq', '/');
    cy.get('[data-cy="recover"]').click();

    cy.get('textarea').type('eye quarter chapter suit cruel scrub verify stuff volume control learn dust');
    cy.get('.ae-button').click();
    cy.get('.security-course-modal > .modal-plain').should('be.visible');
    cy.matchImage();

    cy.get('[data-cy="skip"]').click();
    cy.location('pathname').should('eq', '/transfer');
    cy.matchImage();
  });
});

describe('Onboarding', () => {
  const ensureAnimationOver = () => cy
    .get('.onboarding-page')
    .should(($div) => expect($div.attr('class')).to.not.contain('active'));

  it('walks through', () => {
    openRoot();

    cy.get('[data-cy="onboarding"]').click();
    cy.get('img').then(($el) => $el.get(0).complete).should('equal', true);
    cy.matchImage();

    cy.get('.ae-button[href="/"]');
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="next"]').click();
      cy.get('img').then(($el) => $el.get(0).complete).should('equal', true);
      ensureAnimationOver();
      cy.matchImage();
    }

    cy.get('[data-cy="next"]').click();
    cy.location('pathname').should('eq', '/');
  });

  it('opens at specific step and skips', () => {
    openRoot();
    cy.get('[data-cy="onboarding"]').click();
    cy.get('.step-dots a:nth-child(3)').click();
    ensureAnimationOver();
    cy.location('pathname').should('eq', '/onboarding/aepps');
    cy.get('[href="/"]').click();
    cy.location('pathname').should('eq', '/');
  });
});
