describe('Migration: Fix AES-CTR counter issue', () => {
  it('applicable', () => {
    window.localStorage.vuex = JSON.stringify({
      mobile: {
        keystore: {
          privateKey: {
            type: 'ArrayBuffer',
            data: [
              99, 4, 219, 158, 15, 198, 201, 236, 138, 202, 221, 189, 219, 87, 203, 15, 184,
              28, 207, 134, 243, 213, 211, 141, 156, 20, 132, 145, 136, 28, 109, 9,
            ],
          },
          chainCode: {
            type: 'ArrayBuffer',
            data: [
              29, 207, 72, 217, 189, 67, 247, 140, 250, 57, 100, 241, 154, 179, 88, 242, 37,
              35, 44, 157, 56, 166, 250, 115, 146, 140, 221, 86, 17, 224, 43, 121,
            ],
          },
          mac: {
            type: 'ArrayBuffer',
            data: [64, 93],
          },
          salt: {
            type: 'ArrayBuffer',
            data: [163, 236, 16, 158, 177, 79, 169, 173, 130, 16, 227, 229, 16, 184, 186, 172],
          },
        },
        accountCount: 1,
      },
    });
    cy
      .viewport('iphone-5')
      .visit('/#/login')
      .get('input[type=password]').type('1234')
      .get('button')
      .contains('Login')
      .click()
      .url()
      .should('contain', '/apps')
      .then(() => {
        const state = JSON.parse(localStorage.vuex);
        expect(state.migrations[0]).equal(true);
        expect(state.mobile.keystore).eql({
          privateKey: {
            type: 'ArrayBuffer',
            data: [
              99, 4, 219, 158, 15, 198, 201, 236, 138, 202, 221, 189, 219, 87, 203, 15, 184,
              28, 207, 134, 243, 213, 211, 141, 156, 20, 132, 145, 136, 28, 109, 9,
            ],
          },
          chainCode: {
            type: 'ArrayBuffer',
            data: [
              144, 218, 66, 92, 180, 54, 87, 114, 131, 132, 143, 226, 224, 173, 28, 197, 114,
              142, 124, 11, 21, 5, 172, 88, 155, 166, 49, 135, 6, 41, 82, 54,
            ],
          },
          mac: {
            type: 'ArrayBuffer',
            data: [96, 104],
          },
          salt: {
            type: 'ArrayBuffer',
            data: [163, 236, 16, 158, 177, 79, 169, 173, 130, 16, 227, 229, 16, 184, 186, 172],
          },
        });
      });
  });
});
