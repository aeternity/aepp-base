import { aeSdk } from '../../utils';

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
    cy.get('[data-copy-on-click="ak_8eAGBq1jP4dLsmnmgnSzRBxSh5SU1AVsgbCwSQcXZVwwB6c1t"]');
  });

  describe('redeem', () => {
    it('opens', () => {
      cy.task('changeVideoSource', 'default.y4m');
      cy
        .viewport('iphone-se2')
        .visit('/transfer/redeem', { login: true });
      cy.matchImage({ screenshotConfig: { blackout: ['video'] } });
      cy.get('.button-plain.left').click();
      cy.location('pathname').should('eq', '/transfer');
    });

    if (Cypress.browser.family === 'chromium' && Cypress.browser.name !== 'electron') {
      const inviteAddress = 'ak_neAVPRwddGLRBHa7eFrL5V6zUrqngqofcv484qKbnDnMKk6S8';

      it('scans invalid qr code, empty invite', () => {
        cy.task('changeVideoSource', 'address.y4m');
        cy
          .viewport('iphone-se2')
          .visit('/transfer/redeem', { login: true });

        cy.get('.modal-mobile .modal-plain:contains("QR code is wrong")').should('be.visible');
        cy.matchImage();

        cy.task('changeVideoSource', 'aepp-base-invite.y4m');
        cy.get('.modal-mobile button').click();

        cy.get('.modal-mobile .modal-plain:contains("no tokens")').should('be.visible');
        cy.matchImage();
      });

      it('scans invite', () => {
        cy.task('changeVideoSource', 'aepp-base-invite.y4m');
        cy.wrap(aeSdk.spend(1e15, inviteAddress));
        cy
          .viewport('iphone-se2')
          .visit('/transfer/redeem', { login: true });

        cy.get('.page.redeem-balance').should('be.visible');
        cy.matchImage();

        cy.get('.list-item').first().click();

        cy.get('.notification-spend-success').should('be.visible');
        cy.matchImage();
        cy.wrap(aeSdk.getBalance(inviteAddress)).should('equal', '0');
      });
    }
  });
});
