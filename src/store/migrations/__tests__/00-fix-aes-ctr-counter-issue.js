import fixAesCtrCounterIssue from '../00-fix-aes-ctr-counter-issue';

describe('00-fix-aes-ctr-counter-issue', () => {
  it('migrates on desktop', () => {
    fixAesCtrCounterIssue.migrate({});
  });
});
