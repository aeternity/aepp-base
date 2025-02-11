describe('Settings: Network', () => {
  const testNetworkUrl = 'test-network.url';
  const testNetwork = {
    name: 'test network name',
    url: 'http://test-network.url/',
  };

  it('can be opened, changes network, adds custom network', () => {
    cy.viewport('iphone-se2')
      .visit('/settings', {
        login: true,
        state: {
          customNetworks: [
            {
              name: 'Testnet',
              url: 'https://testnet.aeternity.io',
            },
          ],
        },
      })
      .get('.list-item.network')
      .click()
      .url()
      .should('contain', '/settings/network');

    cy.getState()
      .its('sdkUrl')
      .as('oldSdkUrl')

      .get('.list-item .ae-radio input:not(:checked)')
      .first()
      .closest('.list-item')
      .click()

      .getState()
      .then(({ sdkUrl }) => {
        expect(sdkUrl).not.equal(cy.get('@oldSdkUrl'));
      });

    cy.get('.list-item-button')
      .contains('Connect to another node')
      .click()
      .url()
      .should('contain', '/settings/network/new')

      .get('.ae-input input[name=name]')
      .type(testNetwork.name)
      .get('.ae-input input[name=url]')
      .type(testNetworkUrl)
      .get('.ae-button.secondary.medium')
      .click()
      .url()
      .should('contain', '/settings/network')

      .getState()
      .then(({ sdkUrl, customNetworks }) => {
        expect(sdkUrl).equal(testNetwork.url);
        expect(customNetworks).to.deep.include(testNetwork);
      });
  });
});
