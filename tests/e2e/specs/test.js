describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('Please add this app to home screen');
  });
});
