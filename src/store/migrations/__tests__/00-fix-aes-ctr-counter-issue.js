import fixAesCtrCounterIssue from '../00-fix-aes-ctr-counter-issue';

describe('00-fix-aes-ctr-counter-issue', () => {
  beforeAll(() => {
    global.ENV_MOBILE_DEVICE = false;
  });

  afterAll(() => {
    global.ENV_MOBILE_DEVICE = true;
  });

  it('migrates on desktop', () => {
    fixAesCtrCounterIssue.migrate({});
  });
});
