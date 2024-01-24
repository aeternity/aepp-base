function ensureThrownError(message) {
  cy.wrap(new Promise((resolve) => {
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include(message);
      resolve();
      return false;
    });
  }));
}

describe('Load error', () => {
  [false, true].forEach((isDesktop) => {
    it(`load error ${isDesktop ? 'desktop' : 'mobile'}`, () => {
      if (!isDesktop) cy.viewport('iphone-se2');
      cy.visit('/', {
        isDesktop,
        onBeforeLoad(contentWindow) {
          contentWindow.Array = {}; // eslint-disable-line no-param-reassign
        },
      });
      ensureThrownError('Array.isArray is not a function');
      cy.matchImage();
    });
  });

  [false, true].forEach((isDesktop) => {
    it(`fails to load state ${isDesktop ? 'desktop' : 'mobile'}`, () => {
      if (!isDesktop) cy.viewport('iphone-se2');
      cy.visit('/', {
        isDesktop,
        onBeforeLoad(contentWindow) {
          contentWindow.localStorage.setItem('vuex', '!');
        },
      });
      ensureThrownError('Unexpected token \'!\', "!" is not valid JSON');
      const button = cy.get('.ae-button').should('be.visible');
      cy.matchImage();
      button.click();
      cy.get('.note').should('be.visible'); // reloaded to desktop
    });
  });
});
