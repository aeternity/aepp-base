import {
  pick, cloneDeep, isEqual, throttle, memoize,
} from 'lodash-es';
import RpcPeer from '../../lib/rpc';

const io = async () => (await import(/* webpackChunkName: "socket-io" */ 'socket.io-client')).default;

const getStateForSync = ({
  sdkUrl, accounts: { list, activeIdx }, apps, customNetworks,
}) => ({
  sdkUrl,
  accounts: {
    list: list.map(({ name, address, source }) => {
      switch (source.type) {
        case 'hd-wallet':
          return {
            name,
            address,
            source: pick(source, ['type', 'idx']),
          };
        default:
          return { name, address, source };
      }
    }),
    activeIdx,
  },
  apps,
  customNetworks,
});

export default (store) => {
  const getPushApiSubscription = async () => {
    const { serviceWorkerRegistration } = store.state;
    try {
      const subscription = await serviceWorkerRegistration.pushManager.getSubscription()
        || await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: Buffer.from(process.env.VUE_APP_VAPID_PUBLIC_KEY, 'base64'),
        });
      return JSON.stringify(subscription);
    } catch (e) {
      return 'not-available';
    }
  };

  const open = async () => {
    const query = { key: store.state.peerId };
    if (process.env.IS_MOBILE_DEVICE) {
      query.pushApiSubscription = await getPushApiSubscription();
    }
    const socket = (await io())(process.env.VUE_APP_REMOTE_CONNECTION_BACKEND_URL, { query });
    const closeCbs = [socket.close.bind(socket)];

    let processedState = cloneDeep(getStateForSync(store.state));

    const broadcast = new RpcPeer(message => socket.emit('message-to-all', message), {
      setState(state) {
        processedState = state;
        store.commit('syncState', cloneDeep(state));
      },
    });
    socket.on('message', message => broadcast.processMessage(message));

    const broadcastState = (state) => {
      broadcast.notification('setState', state);
      processedState = cloneDeep(state);
    };

    closeCbs.push(store.watch(getStateForSync, (state) => {
      if (
        isEqual(state, processedState) || (
          process.env.IS_MOBILE_DEVICE
          && !Object.values(store.state.mobile.followers).some(({ connected }) => connected))
      ) return;
      broadcastState(state);
    }, { deep: true }));

    if (process.env.IS_MOBILE_DEVICE) {
      const syncState = throttle(
        () => broadcastState(getStateForSync(store.state)), 500,
      );

      closeCbs.push(store.subscribe(({ type, payload }) => {
        switch (type) {
          case 'addFollower':
            socket.emit('add-follower', payload.id);
            break;
          case 'followerConnected':
            syncState();
            break;
          case 'removeFollower':
            socket.emit('remove-follower', payload);
            break;
          default:
        }
      }));

      socket.on('follower-connected', followerId => store.commit('followerConnected', followerId));
      socket.on('follower-disconnected', followerId => store.commit('followerDisconnected', followerId));
      socket.on('follower-removed', (followerId) => {
        const { name } = store.state.mobile.followers[followerId];
        store.dispatch('modals/open', {
          name: 'notification',
          text: `'${name}' has removed itself`,
        });
        store.commit('followerRemoved', followerId);
      });

      const getRpcPeer = memoize(followerId => new RpcPeer(
        response => socket.emit('message-to-follower', followerId, response), {
          createAccount: name => store.dispatch('accounts/hdWallet/create', name),
          sign: (...args) => store.state.sdk.sign(...args),
          signTransaction: (...args) => store.state.sdk.signTransaction(...args),
        },
      ));
      socket.on(
        'message-from-follower',
        (followerId, request) => getRpcPeer(followerId).processMessage(request),
      );

      const followers = await new Promise(resolve => socket.emit('get-all-followers', resolve));
      Object.entries(followers)
        .filter(([, v]) => v.connected === true)
        .forEach(([followerId]) => store.commit('followerConnected', followerId));

      Object.keys(store.state.mobile.followers)
        .filter(v => !followers[v])
        .forEach(followerId => socket.emit('add-follower', followerId));
    } else {
      socket.on('added-to-group', () => store.commit('setRemoteConnected', true));
      socket.on('removed-from-group', () => store.dispatch('reset'));

      const leader = new RpcPeer(message => socket.emit('message-to-leader', message));
      socket.on('message-from-leader', message => leader.processMessage(message));

      closeCbs.push(store.subscribeAction(({ type }) => {
        if (type !== 'reset') return;
        socket.emit('leave-group');
      }));

      store.registerModule('remoteConnection', {
        namespaced: true,
        actions: {
          call(_, { name, args }) {
            return leader.call(name, ...args);
          },
        },
      });

      closeCbs.push(() => store.unregisterModule('remoteConnection'));
    }

    return () => closeCbs.forEach(f => f());
  };

  let closeCb;
  store.watch(
    process.env.IS_MOBILE_DEVICE
      ? ({ mobile: { followers } }, { loggedIn }) => loggedIn && Object.keys(followers).length
      : () => true,
    async (isConnectionNecessary) => {
      if (isConnectionNecessary && !closeCb) closeCb = await open();
      if (!isConnectionNecessary && closeCb) {
        closeCb();
        closeCb = undefined;
      }
    },
    { immediate: true },
  );

  store.watch(
    ({ peerId }) => peerId,
    async () => {
      if (!closeCb) return;
      closeCb();
      closeCb = await open();
    },
  );
};
