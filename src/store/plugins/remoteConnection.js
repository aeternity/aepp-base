import {
  pick, cloneDeep, isEqual, throttle, memoize,
} from 'lodash-es';
import RpcPeer, { markAbortable } from '../../lib/rpc';
import { IS_IOS } from '../../lib/constants';
import { handleUnknownError } from '../../lib/utils';

const io = async () => (await import(/* webpackChunkName: "socket-io" */ 'socket.io-client')).default;

const getStateForSync = ({
  sdkUrl, accounts: { list, activeIdx }, apps, customNetworks,
}) => ({
  sdkUrl,
  accounts: {
    list: list.map(({ address, source }) => {
      switch (source.type) {
        case 'hd-wallet':
          return {
            address,
            source: pick(source, ['type', 'idx']),
          };
        default:
          return { address, source };
      }
    }),
    activeIdx,
  },
  apps,
  customNetworks,
});

export default (store) => {
  const getPushApiSubscription = async () => {
    // push api is not available on iOS https://caniuse.com/push-api
    if (IS_IOS) return 'not-available';
    try {
      const swReg = await store.dispatch('getServiceWorkerRegistration');
      if (swReg == null) return 'not-available';
      const subscription = await swReg.pushManager.getSubscription()
        || await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: Buffer.from(process.env.VUE_APP_VAPID_PUBLIC_KEY, 'base64'),
        });
      return JSON.stringify(subscription);
    } catch (e) {
      if (e.message === 'Registration failed - permission denied') return 'not-allowed';
      handleUnknownError(e);
      return 'errored';
    }
  };

  const open = async () => {
    const auth = { key: store.state.peerId };
    if (ENV_MOBILE_DEVICE) {
      auth.pushApiSubscription = await getPushApiSubscription();
    }
    const backendUrl = ['', '$VUE_APP_BACKEND_URL'].includes(window.overrideBackendUrl)
      ? process.env.VUE_APP_BACKEND_URL : window.overrideBackendUrl;
    const socket = (await io())(backendUrl, { auth });
    const closeCbs = [socket.close.bind(socket)];

    let processedState = cloneDeep(getStateForSync(store.state));

    const broadcast = new RpcPeer((message) => socket.emit('message-to-all', message), {
      setState(state) {
        processedState = state;
        store.commit('syncState', cloneDeep(state));
      },
    });
    socket.on('message', (message) => broadcast.processMessage(message));

    const broadcastState = (state) => {
      broadcast.notification('setState', state);
      processedState = cloneDeep(state);
    };

    closeCbs.push(store.watch(getStateForSync, (state) => {
      if (
        isEqual(state, processedState) || (
          ENV_MOBILE_DEVICE
          && !Object.values(store.state.mobile.followers).some(({ connected }) => connected))
      ) return;
      broadcastState(state);
    }, { deep: true }));

    if (ENV_MOBILE_DEVICE) {
      const syncState = throttle(() => broadcastState(getStateForSync(store.state)), 500);

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

      socket.on('follower-connected', (followerId) => store.commit('followerConnected', followerId));
      socket.on('follower-disconnected', (followerId) => store.commit('followerDisconnected', followerId));
      socket.on('follower-removed', (followerId) => {
        const { name } = store.state.mobile.followers[followerId];
        store.dispatch('modals/open', {
          name: 'notification',
          text: `'${name}' has removed itself`,
        });
        store.commit('followerRemoved', followerId);
      });

      const getRpcPeer = memoize((followerId) => new RpcPeer((response) => socket.emit('message-to-follower', followerId, response), {
        createAccount: () => store.dispatch('accounts/hdWallet/create'),
        sign: markAbortable((data, options, signal) => store.getters.sdk.sign(data, { ...options, signal })),
        signTransaction: markAbortable((transaction, options, signal) => store.getters.sdk.signTransaction(transaction, { ...options, signal })),
      }));
      socket.on(
        'message-from-follower',
        (followerId, request) => getRpcPeer(followerId).processMessage(request),
      );

      const followers = await new Promise((resolve) => {
        socket.emit('get-all-followers', resolve);
      });
      Object.entries(followers)
        .filter(([, v]) => v.connected === true)
        .forEach(([followerId]) => store.commit('followerConnected', followerId));

      Object.keys(store.state.mobile.followers)
        .filter((v) => !followers[v])
        .forEach((followerId) => socket.emit('add-follower', followerId));
    } else {
      socket.on('added-to-group', () => store.commit('setRemoteConnected', true));
      socket.on('removed-from-group', () => store.dispatch('reset'));

      const leader = new RpcPeer((message) => socket.emit('message-to-leader', message));
      socket.on('message-from-leader', (message) => leader.processMessage(message));

      closeCbs.push(store.subscribeAction(({ type }) => {
        if (type !== 'reset') return;
        socket.emit('leave-group');
      }));

      store.registerModule('remoteConnection', {
        namespaced: true,
        actions: {
          call(_, { name, args = [], signal }) {
            return leader.call({ method: name, signal }, ...args);
          },
        },
      });

      closeCbs.push(() => store.unregisterModule('remoteConnection'));
    }

    return () => closeCbs.forEach((f) => f());
  };

  let closeCb;
  store.watch(
    ENV_MOBILE_DEVICE
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
