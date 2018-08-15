import notificationOnRemoveConnection from '../notificationOnRemoteConnection';

const testFollower = {
  id: 'test-follower-id',
  name: 'test-follower-name',
};
const getDispatch = (disconnectedAt, mutation) => {
  const store = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    state: {
      mobile: {
        followers: {
          [testFollower.id]: { name: testFollower.name, disconnectedAt },
        },
      },
    },
  };
  notificationOnRemoveConnection(store);
  store.subscribe.mock.calls[0][0](mutation, store.state);
  return store.dispatch;
};
const testMutation = {
  type: 'followerConnected', payload: testFollower.id,
};

it('emits notification', () =>
  expect(getDispatch(false, testMutation)).toHaveBeenCalledWith('setNotification', {
    text: `You successfully connected ${testFollower.name}`,
    autoClose: true,
  }));

it('does not emits notification if follower was connected before', () =>
  expect(getDispatch(true, testMutation)).toHaveBeenCalledTimes(0));

it('does not emits notification if mutation type is different', () =>
  expect(getDispatch(false, { type: 'test' })).toHaveBeenCalledTimes(0));
