const _createPromise = getter => new Promise(
  (resolve, reject) => {
    getter((err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }
)

export const getEstimatedGas = (web3, tx) =>
  _createPromise(web3.eth.estimateGas.bind(undefined, tx))

export const getGasPrice = web3 => _createPromise(web3.eth.getGasPrice.bind(web3.eth))
