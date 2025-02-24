import {
  buildTx,
  unpackTx,
  Tag,
  encode,
  decode,
  commitmentHash,
  Encoding,
  ORACLE_TTL_TYPES,
  oracleQueryId,
} from '@aeternity/aepp-sdk';

describe('Sign transaction', () => {
  const nonce = 1;
  const nameTtl = 1;
  const clientTtl = 1;
  const amount = 12.34e18;
  const accountId = 'ak_2iBPH7HUz3cSDVEUWiHg76MZJ6tZooVNBmmxcgVK6VV8KAE688';
  const recipientId = 'ak_2iBPH7HUz3cSDVEUWiHg76MZJ6tZooVNBmmxcgVK6VV8KAE688';
  const name = 'test123test.chain';
  const nameId = 'nm_2sFnPHi5ziAqhdApSpRBsYdomCahtmk3YGNZKYUTtUNpVSMccC';
  const nameFee = '10000000000000000000';
  const contractId = 'ct_TCQVoset7Y4qEyV5tgEAJAqa2Foz8J1EXqoGpq3fB6dWH5roe';
  const pointers = [
    { key: 'account_pubkey', id: accountId },
    { key: 'test key', id: accountId },
    { key: 'contract_pubkey', id: contractId },
  ];
  const payload = encode(Buffer.from('test'), Encoding.Bytearray);
  const queryFormat = "{'city': str}";
  const responseFormat = "{'tmp': num}";
  const queryFee = 30000;
  const oracleTtl = { oracleTtlType: ORACLE_TTL_TYPES.delta, oracleTtlValue: 500 };
  const responseTtl = { responseTtlType: ORACLE_TTL_TYPES.delta, responseTtlValue: 100 };
  const queryTtl = { queryTtlType: ORACLE_TTL_TYPES.delta, queryTtlValue: 100 };
  const query = "{'city': 'Berlin'}";
  const queryResponse = "{'tmp': 101}";
  const callData = 'cb_KxFs8lcLG2+HEPb2FOjjZ2DqRd4=';
  const gasLimit = 5e6;
  const nameSalt = 4204563566073083;
  const commitmentId = commitmentHash(name, nameSalt);
  const oracleId = encode(decode(accountId), Encoding.OracleAddress);

  const transactions = [
    {
      tag: Tag.SpendTx,
      senderId: accountId,
      recipientId: accountId,
      nonce,
      amount,
      payload,
    },
    {
      tag: Tag.NamePreclaimTx,
      accountId,
      nonce,
      commitmentId,
    },
    {
      tag: Tag.NameClaimTx,
      accountId,
      nonce,
      name,
      nameSalt,
      nameFee,
    },
    {
      tag: Tag.NameUpdateTx,
      accountId,
      nonce,
      nameId,
      nameTtl,
      pointers,
      clientTtl,
    },
    {
      tag: Tag.NameRevokeTx,
      accountId,
      nonce,
      nameId,
    },
    {
      tag: Tag.NameTransferTx,
      accountId,
      nonce,
      nameId,
      recipientId,
    },
    {
      tag: Tag.ContractCreateTx,
      nonce,
      ownerId: accountId,
      code: 'cb_+ExGA6Dh3797nquCHCSm088avgOiqgjjarRQviEYAXq+YlegWcCgjf6AeCCSADcBBwcBAQCOLwERgHggkhlnZXRBcmeCLwCFNy4wLjEALb9eTg==',
      amount,
      gasLimit,
      callData,
    },
    {
      tag: Tag.ContractCallTx,
      nonce,
      callerId: accountId,
      contractId,
      amount,
      gasLimit,
      callData,
    },
    {
      tag: Tag.OracleRegisterTx,
      nonce,
      accountId,
      queryFormat,
      responseFormat,
      queryFee,
      ...oracleTtl,
    },
    {
      tag: Tag.OracleExtendTx,
      nonce,
      oracleId,
      ...oracleTtl,
    },
    {
      tag: Tag.OracleQueryTx,
      nonce,
      oracleId,
      ...responseTtl,
      query,
      ...queryTtl,
      queryFee,
      senderId: accountId,
    },
    {
      tag: Tag.OracleResponseTx,
      nonce,
      oracleId,
      ...responseTtl,
      queryId: oracleQueryId(accountId, nonce, oracleId),
      response: queryResponse,
    },
  ];

  transactions.forEach((txParams) => {
    it(`shows ${Tag[txParams.tag]} details`, () => {
      const url = new URL('http://localhost/signTransaction');
      url.searchParams.append('param0', `"${buildTx(txParams)}"`);
      url.searchParams.append('callback', 'about:blank');
      cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), { login: true });
      cy.get('.page.primary')
        .should('be.visible')
        .then(($el) => {
          if ($el.text().includes('Sign raw transaction')) return;
          cy.get('.details-fee-input .turtle-rabbit').should('be.visible');
        });
      cy.matchImage();
    });
  });

  it('signs transaction', () => {
    const url = new URL('http://localhost/signTransaction');
    url.searchParams.append('param0', `"${buildTx(transactions[0])}"`);
    url.searchParams.append('callback', 'about:blank');
    cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), {
      login: 'wallet-empty',
    });
    cy.get('button').contains('Confirm').click();
    const skipButton = cy.get('.modal-plain .ae-button.primary').should('be.visible');
    cy.matchImage();
    skipButton.click();

    cy.url()
      .should('contain', 'about:blank')
      .then((u) => {
        const resultUrl = new URL(u);
        const signedTx = resultUrl.searchParams.get('result');
        const txParams = unpackTx(JSON.parse(decodeURIComponent(signedTx)), Tag.SignedTx);
        expect(txParams.signatures).to.have.length(1);
      });
  });

  it('cancel transaction signing', () => {
    const url = new URL('http://localhost/signTransaction');
    url.searchParams.append('param0', `"${buildTx(transactions[0])}"`);
    url.searchParams.append('callback', 'about:blank');
    cy.viewport('iphone-se2').visit(url.href.replace('http://localhost', ''), { login: true });
    cy.get('button').contains('Cancel').click();
    cy.url().should('equal', 'about:blank?error=Rejected+by+user');
  });
});
