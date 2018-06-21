export default store => {
  const methods = {
    getAccount: () =>
      store.getters.activeIdentity && store.getters.activeIdentity.address,
    signTransaction: (transaction, origin) =>
      store.dispatch('signTransaction', { transaction, appName: origin }),
    signPersonalMessage: ({ message, address }, origin) =>
      store.dispatch('signPersonalMessage', { message, address, appName: origin }),
    handShake: () => null
  }

  window.addEventListener('message', async ({ data, origin, source }) => {
    if (!data.uuid || !methods[data.method]) {
      // this message isnt meant for us
      return
    }

    let error = null
    let payload = null
    try {
      payload = await methods[data.method](data.payload, origin)
    } catch (e) {
      error = e.toString()
    }

    source.postMessage({
      uuid: data.uuid,
      method: `${data.method}Return`,
      error,
      payload
    }, origin)
  })
}
