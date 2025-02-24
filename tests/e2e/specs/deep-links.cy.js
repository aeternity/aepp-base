import { verify } from '@aeternity/aepp-sdk';

describe('Deep links', () => {
  const signer = 'ak_2ujJ8N4GdKapdE2a7aEy4Da3pfPdV7EtJdaA7BUpJ8uqgkQdEB';

  describe('Get address', () => {
    it('returns', () => {
      const url = new URL('http://localhost/address');
      url.searchParams.append('callback', 'http://faucet.aepps.com');
      cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), {
        login: 'wallet-empty',
      });
      const button = cy.get('button').contains('Allow').should('be.visible');
      cy.get('.confirm-account-access img').should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
      cy.matchImage();
      button.click();

      cy.url()
        .should('contain', 'faucet.aepps.com')
        .then((u) => {
          const resultUrl = new URL(u);
          const result = JSON.parse(decodeURIComponent(resultUrl.searchParams.get('result')));
          expect(result).to.equal(signer);
        });
    });

    it('returns if allowed before', () => {
      const url = new URL('http://localhost/address');
      url.searchParams.append('callback', 'http://faucet.aepps.com');
      cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), {
        login: 'wallet-empty',
        state: {
          apps: [
            {
              host: 'faucet.aepps.com',
              permissions: {
                accessToAccounts: [signer],
              },
            },
          ],
        },
      });

      cy.url()
        .should('contain', 'faucet.aepps.com')
        .then((u) => {
          const resultUrl = new URL(u);
          const result = JSON.parse(decodeURIComponent(resultUrl.searchParams.get('result')));
          expect(result).to.equal(signer);
        });
    });

    it('redirects if selected correct account', () => {
      const url = new URL('http://localhost/address');
      const signer2 = 'ak_2Mz7EqTRdmGfns7fvLYfLFLoKyXj8jbfHbfwERfwFZgoZs4Z3T';
      url.searchParams.append('callback', 'http://faucet.aepps.com');
      cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), {
        login: 'wallet-empty',
        state: {
          apps: [
            {
              host: 'faucet.aepps.com',
              permissions: {
                accessToAccounts: [signer2],
              },
            },
          ],
        },
      });
      cy.get('button').contains('Allow').should('be.visible');
      cy.get('.tab-bar .ae-identicon').last().click();
      cy.get('.account-switcher-modal .list-item').contains('Account #2').click();

      cy.url()
        .should('contain', 'faucet.aepps.com')
        .then((u) => {
          const resultUrl = new URL(u);
          const result = JSON.parse(decodeURIComponent(resultUrl.searchParams.get('result')));
          expect(result).to.equal(signer2);
        });
    });

    it('cancels', () => {
      const url = new URL('http://localhost/address');
      url.searchParams.append('callback', 'about:blank');
      cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), { login: true });
      cy.get('button').contains('Deny').click();
      cy.url().should('equal', 'about:blank?error=Rejected+by+user');
    });
  });

  describe('Sign raw data', () => {
    const data = 'test';

    it('signs', () => {
      const url = new URL('http://localhost/sign');
      url.searchParams.append('param0', `"${data}"`);
      url.searchParams.append('callback', 'about:blank');
      cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), {
        login: 'wallet-empty',
      });
      const button = cy.get('button').contains('Confirm').should('be.visible');
      cy.matchImage();
      button.click();

      cy.url()
        .should('contain', 'about:blank')
        .then((u) => {
          const resultUrl = new URL(u);
          const signature = Buffer.from(
            Object.values(JSON.parse(decodeURIComponent(resultUrl.searchParams.get('result')))),
          );
          expect(verify(Buffer.from(data), signature, signer)).to.equal(true);
        });
    });

    it('cancels', () => {
      const url = new URL('http://localhost/sign');
      url.searchParams.append('param0', `"${data}"`);
      url.searchParams.append('callback', 'about:blank');
      cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), { login: true });
      cy.get('button').contains('Cancel').click();
      cy.url().should('equal', 'about:blank?error=Rejected+by+user');
    });
  });
});
