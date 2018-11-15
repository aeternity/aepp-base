import fixAesCtrCounterIssue from '../fix-aes-ctr-counter-issue';

describe('fix-aes-ctr-counter-issue', () => {
  it('migrates on desktop', () => {
    fixAesCtrCounterIssue.migrate({});
  });
});
