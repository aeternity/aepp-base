import io from 'socket.io-client'
import { omit, cloneDeep, isEqual, throttle } from 'lodash-es'
import noiseWasmPath from 'noise-c.wasm/src/noise-c.wasm'
import createNoise from 'noise-c.wasm'
import RpcPeer from '../../lib/rpc'
import { getPeerIdByKey, genRandomBuffer } from '../utils'

class RpcPeerCipher extends RpcPeer {
  constructor (sendCipher, receiveCipher, messageSender, handlers) {
    super(
      message => messageSender(this.sendCipher.EncryptWithAd('', JSON.stringify(message)).buffer),
      handlers)
    this.sendCipher = sendCipher
    this.receiveCipher = receiveCipher
  }

  processMessage (encryptedMessage) {
    return super.processMessage(
      JSON.parse(
        Buffer.from(
          this.receiveCipher.DecryptWithAd('', new Uint8Array(encryptedMessage)))
          .toString()))
  }
}

const BACKEND_URL = 'https://signaling.aepps.com'
const PAIR_SYNC_FIELDS = ['apps', 'rpcUrl', 'addresses', 'selectedIdentityIdx', 'addressBook']
const NOISE_PROTOCOL_NAME = 'Noise_NK_25519_ChaChaPoly_BLAKE2s'

export default async store => {
  const noise = await new Promise((resolve) => {
    const lib = createNoise({
      locateFile: fileName => {
        if (fileName === 'noise-c.wasm') return noiseWasmPath
        return fileName
      }
    })
    lib.ready(() => resolve(lib))
  })

  const {
    NOISE_ROLE_INITIATOR,
    NOISE_ROLE_RESPONDER,
    NOISE_CIPHER_CHACHAPOLY
  } = noise.constants

  const open = () => {
    const query = {
      key: process.env.IS_MOBILE_DEVICE
        ? getPeerIdByKey(genRandomBuffer(15))
        : store.getters.peerId
    }
    if (process.env.IS_MOBILE_DEVICE) {
      query.followers = Object.keys(store.state.mobile.followers)
    }
    const socket = io(BACKEND_URL, { query })
    const closeCbs = [socket.close.bind(socket)]

    socket.on('exception', console.error)

    let lastReceivedState
    const broadcast = new RpcPeerCipher(
      null,
      null,
      message => socket.emit('message-to-all', message), {
        setState (state) {
          lastReceivedState = state
          store.replaceState({
            ...omit(store.state, PAIR_SYNC_FIELDS),
            ...cloneDeep(state)
          })
        }
      })
    socket.on('message', message => broadcast.processMessage(message))

    const getStateForSync = (state, getters) =>
      PAIR_SYNC_FIELDS.reduce((p, n) => ({ ...p, [n]: getters[n] || state[n] }), {})
    const broadcastState = state => {
      if (
        isEqual(state, lastReceivedState) || (
          process.env.IS_MOBILE_DEVICE &&
          !Object.values(store.state.mobile.followers).some(({ connected }) => connected))
      ) return
      broadcast.notification('setState', state)
      lastReceivedState = null
    }
    closeCbs.push(store.watch(getStateForSync, broadcastState))

    if (process.env.IS_MOBILE_DEVICE) {
      const broadcastCipher = noise.CipherState(NOISE_CIPHER_CHACHAPOLY)
      const broadcastCipherKey = genRandomBuffer(32)
      let broadcastCipherNonce = 0
      const wrapWithIncNonce = func => function (...args) {
        const result = func.call(this, ...args)
        broadcastCipherNonce++
        return result
      }
      broadcastCipher.EncryptWithAd = wrapWithIncNonce(noise.CipherState.prototype.EncryptWithAd)
      broadcastCipher.DecryptWithAd = wrapWithIncNonce(noise.CipherState.prototype.DecryptWithAd)
      broadcastCipher.InitializeKey(new Uint8Array(broadcastCipherKey))
      broadcast.sendCipher = broadcast.receiveCipher = broadcastCipher
      const handshakes = {}
      const rpcPeers = {}

      const syncState = throttle(() =>
        broadcastState(getStateForSync(store.state, store.getters)), 500)

      closeCbs.push(store.subscribe(({ type, payload }) => {
        switch (type) {
          case 'addFollower':
            socket.emit('add-follower', getPeerIdByKey(payload.key))
            break
          case 'removeFollower':
            socket.emit('remove-follower', payload)
            break
        }
      }))

      socket.on('follower-connected', followerId => {
        const handshake = noise.HandshakeState(NOISE_PROTOCOL_NAME, NOISE_ROLE_INITIATOR)
        handshake.Initialize(
          null,
          null,
          new Uint8Array(store.state.mobile.followers[followerId].key))
        socket.emit(
          'message-to-follower',
          followerId,
          handshake.WriteMessage().buffer)
        handshakes[followerId] = handshake
      })

      socket.on('follower-disconnected', followerId =>
        store.commit('followerDisconnected', followerId))

      socket.on('message-from-follower', (followerId, request) => {
        const handshake = handshakes[followerId]
        if (handshake) {
          handshake.ReadMessage(new Uint8Array(request))
          rpcPeers[followerId] = new RpcPeerCipher(
            ...handshake.Split(),
            response => socket.emit('message-to-follower', followerId, response),
            {
              signTransaction: args => store.dispatch('signTransaction', args),
              cancelTransaction: args => store.commit('cancelTransaction', args)
            })
          delete handshakes[followerId]

          rpcPeers[followerId].notification(
            'initBroadcastCipher',
            Buffer.from(broadcastCipherKey).toString('base64'),
            broadcastCipherNonce)

          store.commit('followerConnected', followerId)
          syncState()
          return
        }

        rpcPeers[followerId].processMessage(request)
      })
    } else {
      let leader

      socket.on('removed-from-group', () => {
        leader = null
        store.commit('setRemoteConnected', false)
      })

      socket.on('message-from-leader', message => {
        if (!leader) {
          const handshake = noise.HandshakeState(NOISE_PROTOCOL_NAME, NOISE_ROLE_RESPONDER)
          handshake.Initialize(null, new Uint8Array(store.state.desktop.remoteConnectionPrivateKey))
          handshake.ReadMessage(new Uint8Array(message))
          socket.emit('message-to-leader', handshake.WriteMessage().buffer)
          leader = new RpcPeerCipher(
            ...handshake.Split(),
            message => socket.emit('message-to-leader', message), {
              initBroadcastCipher (key, nonce) {
                const broadcastCipher = noise.CipherState(NOISE_CIPHER_CHACHAPOLY)
                broadcastCipher.InitializeKey(Buffer.from(key, 'base64'))
                broadcastCipher.SetNonce(nonce)
                broadcast.sendCipher = broadcast.receiveCipher = broadcastCipher
              }
            })
          store.commit('setRemoteConnected', true)
          return
        }

        leader.processMessage(message)
      })

      closeCbs.push(store.subscribe(({ type, payload }) => {
        switch (type) {
          case 'setTransactionToSign':
            if (!payload) return
            leader.call('signTransaction', payload.args).then(payload.resolve, payload.reject)
            break
          case 'cancelTransaction':
            leader.call('cancelTransaction', store.state.desktop.transactionToSignByRemote.args.id)
            break
        }
      }))
    }

    return () => closeCbs.forEach(f => f())
  }

  if (process.env.IS_MOBILE_DEVICE) {
    let closeCb
    store.watch(
      ({ mobile: { followers } }, { loggedIn }) => loggedIn && Object.keys(followers).length,
      isConnectionNecessary => {
        if (isConnectionNecessary && !closeCb) closeCb = open()
        if (!isConnectionNecessary && closeCb) {
          closeCb()
          closeCb = undefined
        }
      },
      { immediate: true })
  } else {
    open(store)
  }
}
