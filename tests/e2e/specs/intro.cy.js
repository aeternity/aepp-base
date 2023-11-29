const stateCreatedMnemonic = require('../fixtures/state-created-mnemonic-not-backup.json');
const stateRecovered = require('../fixtures/state-recovered.json');

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

    cy.stubCryptoRandom();
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
    cy.getState().then((state) => {
      expect(state).to.be.eql({ ...stateCreatedMnemonic, peerId: state.peerId });
    });
  });

  it('recovers an account, goes to transfer', () => {
    openRoot();

    cy.get('[data-cy="recover"]').click();
    cy.matchImage();
    cy.get('.ae-link[href="/"]').click();
    cy.location('pathname').should('eq', '/');
    cy.get('[data-cy="recover"]').click();

    cy.get('textarea').type('abandon amount liar amount expire adjust cage candy arch gather drum buyer');
    cy.get('.ae-button').click();
    cy.get('.security-course-modal > .modal-plain').should('be.visible');
    cy.matchImage();

    cy.get('[data-cy="skip"]').click();
    cy.location('pathname').should('eq', '/transfer');
    cy.matchImage();
    cy.getState().then((state) => {
      expect(state).to.be.eql({ ...stateRecovered, peerId: state.peerId });
    });
  });
});

describe('Onboarding', () => {
  const ensureAnimationOver = () => cy
    .get('.onboarding-page')
    .should(($div) => expect($div.attr('class')).to.not.contain('active'));

  it('walks through', () => {
    openRoot();

    cy.get('[data-cy="onboarding"]').click();
    cy.get('img').should(($img) => expect($img[0].naturalWidth).to.be.greaterThan(0));
    ensureAnimationOver();
    cy.matchImage();

    cy.get('.ae-button[href="/"]');
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="next"]').click();
      cy.get('img').should(($img) => expect($img[0].naturalWidth).to.be.greaterThan(0));
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
