import pollBalance from '../pollBalance';

const testAddress = 'test-address';
const getDispatch = (isActiveIdentityDefined) => {
  const store = {
    watch: jest.fn(),
    dispatch: jest.fn(),
    state: {},
    getters: { activeIdentity: isActiveIdentityDefined && { address: testAddress } },
  };
  pollBalance(store);
  const [getter, callback] = store.watch.mock.calls[0];
  callback(getter(store.state, store.getters));
  return store.dispatch;
};

jest.useFakeTimers();

it('emits updateBalance immediately', async () => {
  const dispatch = getDispatch(true);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith('updateBalance', testAddress);
});

it('emits updateBalance in interval', async () => {
  const dispatch = getDispatch(true);
  jest.runOnlyPendingTimers();
  expect(dispatch).toHaveBeenCalledTimes(2);
  jest.runOnlyPendingTimers();
  expect(dispatch).toHaveBeenCalledTimes(3);
});

it('does not emits updateBalance if activeIdentity is undefined', async () => {
  const dispatch = getDispatch(false);
  expect(dispatch).toHaveBeenCalledTimes(0);
});
