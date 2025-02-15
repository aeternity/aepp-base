function ensureImagesLoaded($imgs) {
  Array.from($imgs).forEach((img) => {
    expect(img.naturalWidth).to.be.greaterThan(0);
  });
}

describe('Browser', () => {
  it('shows app list', () => {
    cy.viewport('iphone-se2').visit('/browser', {
      login: true,
      state: {
        apps: ['example.com', 'faucet.aepps.com'].map((host) => ({
          host,
          bookmarked: true,
          permissions: { accessToAccounts: [] },
        })),
      },
    });
    cy.get('.ae-card img').should('be.visible').and('length', 3).and(ensureImagesLoaded);
    cy.get('.shortcuts img:not([src^="data:image"])')
      .should('be.visible')
      .and('length', 1)
      .and(ensureImagesLoaded);
    cy.matchImage();

    cy.get('.ae-card a').contains('faucet.aepps.com').click();
    cy.location('pathname').should('equal', '/browser/details/faucet.aepps.com');
  });

  it('shows app details', () => {
    cy.viewport('iphone-se2').visit('/browser/details/faucet.aepps.com', { login: true });
    cy.get('img').should('be.visible').and('length', 1).and(ensureImagesLoaded);
    cy.matchImage();

    cy.get('.ae-button').click();
    cy.location('pathname').should('equal', '/browser/faucet.aepps.com');
  });

  it('shows aepp in browser and bookmarks', () => {
    cy.viewport('iphone-se2').visit('/browser/faucet.aepps.com', { login: true });
    cy.get('.progress-fake').should('not.exist');
    cy.getIframeBody().find('button:contains("Wallet")').should('be.visible');
    cy.matchImage();

    cy.get('.button-plain .icon.bookmark').click().should('have.class', 'bookmark-full');
    cy.get('.button-plain .icon.home').click();
    cy.location('pathname').should('equal', '/browser');
    cy.get('.shortcuts .ae-link').contains('Faucet Aepp').should('be.visible');
  });

  it('navigates to aepp', () => {
    cy.viewport('iphone-se2').visit('/browser', { login: true });
    cy.get('input').type('faucet.aepps.com{enter}');
    cy.location('pathname').should('equal', '/browser/faucet.aepps.com');
  });

  it('shows app list on desktop', () => {
    cy.visit('/', { isDesktop: true });
    cy.get('.apps img:not([src^="data:image"])')
      .should('be.visible')
      .and('length', 3)
      .and(ensureImagesLoaded);
    cy.matchImage();
    cy.get('a').contains('Faucet Aepp').should('have.attr', 'href', 'https://faucet.aepps.com');
  });
});
