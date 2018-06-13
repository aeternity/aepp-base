import io from 'socket.io-client'
import _ from 'lodash'
import IS_MOBILE_DEVICE from '../../lib/isMobileDevice'
import RpcPeer from '../../lib/rpc'

const BACKEND_URL = 'https://signaling.aepps.com'
const PAIR_SYNC_FIELDS = ['apps', 'rpcUrl', 'addresses', 'selectedIdentityIdx', 'addressBook']

class RemoteConnection {
  constructor () {
    this.plugin = this.plugin.bind(this)
  }

  open (store) {
    const query = { key: store.state.peerKey }
    if (IS_MOBILE_DEVICE) {
      query.followers = Object.keys(store.state.mobile.followers)
    }
    const socket = io(BACKEND_URL, { query })

    socket.on('exception', console.error)

    let lastReceivedState
    const broadcast = new RpcPeer(
      message => socket.emit('message-to-all', message), {
        setState (state) {
          lastReceivedState = state
          store.replaceState({
            ..._.omit(store.state, PAIR_SYNC_FIELDS),
            ..._.cloneDeep(state)
          })
        }
      })
    socket.on('message', message => broadcast.processMessage(message))

    const getStateForSync = (state, getters) =>
      PAIR_SYNC_FIELDS.reduce((p, n) => ({ ...p, [n]: getters[n] || state[n] }), {})
    const broadcastState = state => {
      if (
        _.isEqual(state, lastReceivedState) ||
        (IS_MOBILE_DEVICE && !Object.keys(store.state.mobile.isFollowerConnected).length)
      ) return
      broadcast.notification('setState', state)
      lastReceivedState = null
    }
    this.unwatch = store.watch(getStateForSync, broadcastState)

    if (IS_MOBILE_DEVICE) {
      const syncState = _.throttle(() =>
        broadcastState(getStateForSync(store.state, store.getters)), 500)

      this.unsubscribe = store.subscribe(({ type, payload }) => {
        switch (type) {
          case 'addFollower':
            socket.emit('add-follower', payload.key)
            break
          case 'followerConnected':
            syncState()
            break
          case 'removeFollower':
            socket.emit('remove-follower', payload)
            break
        }
      })

      socket.on('follower-connected', fKey => store.commit('followerConnected', fKey))
      socket.on('follower-disconnected', fKey => store.commit('followerDisconnected', fKey))

      socket.on('message-from-follower', (followerKey, request) =>
        new RpcPeer(
          response => socket.emit('message-to-follower', followerKey, response), {
            signTransaction: args => store.dispatch('signTransaction', args),
            cancelTransaction: args => store.commit('cancelTransaction', args)
          })
          .processMessage(request))
    } else {
      socket.on('added-to-group', () => store.commit('setRemoteConnected', true))
      socket.on('removed-from-group', () => store.commit('setRemoteConnected', false))

      this.leader = new RpcPeer(message => socket.emit('message-to-leader', message))
      socket.on('message-from-leader', message => this.leader.processMessage(message))
    }

    this.socket = socket
  }

  close () {
    this.unwatch()
    this.unsubscribe()
    this.socket.close()
    delete this.unwatch
    delete this.unsubscribe
    delete this.socket
  }

  plugin (store) {
    if (IS_MOBILE_DEVICE) {
      store.watch(
        ({ mobile: { followers } }, { loggedIn }) => loggedIn && Object.keys(followers).length,
        isConnectionNecessary => {
          if (isConnectionNecessary && !this.socket) this.open(store)
          if (!isConnectionNecessary && this.socket) this.close()
        },
        { immediate: true })
    } else {
      this.open(store)
    }
  }
}

export default new RemoteConnection()
