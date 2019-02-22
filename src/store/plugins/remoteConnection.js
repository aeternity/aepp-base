import io from 'socket.io-client';
import {
  omit, cloneDeep, isEqual, throttle,
} from 'lodash-es';
import BigNumber from 'bignumber.js';
import RpcPeer from '../../lib/rpc';
import { genRandomBuffer } from '../utils';

const BACKEND_URL = 'https://signaling.aepps.com';
const PAIR_SYNC_FIELDS = ['rpcUrl', 'addresses', 'selectedIdentityIdx', 'addressBook'];

export default (store) => {
  const open = () => {
    const query = {
      key: process.env.IS_MOBILE_DEVICE
        ? Buffer.from(genRandomBuffer(15)).toString('base64')
        : store.state.desktop.peerId,
    };
    if (process.env.IS_MOBILE_DEVICE) {
      query.followers = Object.keys(store.state.mobile.followers);
    }
    const socket = io(BACKEND_URL, { query });
    const closeCbs = [socket.close.bind(socket)];

    let lastReceivedState;
    const broadcast = new RpcPeer(message => socket.emit('message-to-all', message), {
      setState(state) {
        lastReceivedState = state;
        store.replaceState({
          ...omit(store.state, PAIR_SYNC_FIELDS),
          ...cloneDeep(state),
        });
      },
    });
    socket.on('message', message => broadcast.processMessage(message));

    const getStateForSync = (state, getters) => PAIR_SYNC_FIELDS
      .reduce((p, n) => ({ ...p, [n]: getters[n] || state[n] }), {});
    const broadcastState = (state) => {
      if (
        isEqual(state, lastReceivedState) || (
          process.env.IS_MOBILE_DEVICE
          && !Object.values(store.state.mobile.followers).some(({ connected }) => connected))
      ) return;
      broadcast.notification('setState', state);
      lastReceivedState = null;
    };
    closeCbs.push(store.watch(getStateForSync, broadcastState));

    if (process.env.IS_MOBILE_DEVICE) {
      const syncState = throttle(
        () => broadcastState(getStateForSync(store.state, store.getters)), 500,
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

      const followerSignPromises = {};
      socket.on('message-from-follower', (followerId, request) => new RpcPeer(response => socket.emit('message-to-follower', followerId, response), {
        signTransaction: (args) => {
          const promise = store.dispatch('signTransaction', {
            ...args,
            transaction: {
              ...args.transaction,
              amount: BigNumber(args.transaction.amount),
              fee: BigNumber(args.transaction.fee),
            },
          });
          followerSignPromises[followerId] = promise;
          return Promise.race([
            new Promise((resolve, reject) => promise
              .finally(() => promise.isCancelled() && reject(new Error('Canceled')))),
            followerSignPromises[followerId],
          ]);
        },
        cancelTransaction: () => followerSignPromises[followerId].cancel(),
      })
        .processMessage(request));
    } else {
      socket.on('added-to-group', () => store.commit('setRemoteConnected', true));
      socket.on('removed-from-group', () => store.commit('setRemoteConnected', false));

      const leader = new RpcPeer(message => socket.emit('message-to-leader', message));
      socket.on('message-from-leader', message => leader.processMessage(message));
      closeCbs.push(store.subscribe(({ type, payload }) => {
        switch (type) {
          case 'setTransactionToSign':
            if (!payload) return;
            leader.call('signTransaction', payload.args).then(payload.resolve, payload.reject);
            break;
          case 'cancelTransaction':
            leader.call('cancelTransaction', store.state.desktop.transactionToSignByRemote.args.id);
            break;
          default:
        }
      }));
    }

    return () => closeCbs.forEach(f => f());
  };

  let closeCb;
  store.watch(
    process.env.IS_MOBILE_DEVICE
      ? ({ mobile: { followers } }, { loggedIn }) => loggedIn && Object.keys(followers).length
      : ({ desktop: { ledgerConnected } }) => !ledgerConnected,
    (isConnectionNecessary) => {
      if (isConnectionNecessary && !closeCb) closeCb = open();
      if (!isConnectionNecessary && closeCb) {
        closeCb();
        closeCb = undefined;
      }
    },
    { immediate: true },
  );
};
