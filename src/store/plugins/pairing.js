import io from 'socket.io-client'
import iceServers from '@/lib/iceServers'

const RTC_SIGNALING_URL = 'https://signaling.aepps.com'

export default class {
  constructor () {
    this.plugin = this.plugin.bind(this)
  }

  send (message) {
    this.rtcChannel.send(message)
  }


  plugin (store) {
    store.watch(
      ({ pairKey }) => pairKey,
      async (key) => {
        if (this.rtcConnection) this.rtcConnection.close()
        if (!key) return

        this.rtcConnection = new RTCPeerConnection({ iceServers })

        const socket = io(RTC_SIGNALING_URL, { query: { key } })
        let createOffer = false
        socket.on('first', () => {
          createOffer = true
        })
        socket.on('description', async (description) => {
          this.rtcConnection.setRemoteDescription(description)
          if (!createOffer) {
            const answer = await this.rtcConnection.createAnswer()
            this.rtcConnection.setLocalDescription(answer)
            socket.emit('description', answer)
          }
        })
        await new Promise(resolve => socket.on('ready', resolve))

        socket.on('ice-candidate', candidate => this.rtcConnection.addIceCandidate(candidate))
        this.rtcConnection.onicecandidate = ({ candidate }) =>
          candidate && socket.emit('ice-candidate', candidate)

        if (createOffer) {
          this.rtcChannel = this.rtcConnection.createDataChannel('sendChannel')
          const offer = await this.rtcConnection.createOffer()
          this.rtcConnection.setLocalDescription(offer)
          socket.emit('description', offer)
        } else {
          await new Promise(resolve => {
            this.rtcConnection.ondatachannel = event => {
              this.rtcChannel = event.channel
              resolve()
            }
          })
        }

        this.rtcChannel.onopen = () => {
          store.commit('setPairConnected', true)
          socket.disconnect()
        }
        this.rtcChannel.onclose = () => {
          store.commit('setPairConnected', false)
          store.commit('setPairKey', null)
        }
        this.rtcChannel.onmessage = event => this.onMessage(event.data)
      },
      { immediate: true })
  }
}
