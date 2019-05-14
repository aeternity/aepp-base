import { prepare } from '../utils';

describe('My First Test', () => {
  it('Visits the app root url', () => {
    prepare();

    cy.visit('/');
    cy.contains('Create New Account');
  });
});
