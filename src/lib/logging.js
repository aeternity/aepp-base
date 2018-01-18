import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import aeAbi from '@/abi/aeternity-token-abi.json'
import abiDecoder from 'abi-decoder'

const {toHex} = Web3.prototype

export const logTx = (tx, tokenAddress) => {
  const nonce = tx.nonce ? tx.nonce : null
  const from = tx.from
  const to = tx.to ? toHex(tx.to).toLowerCase() : null
  const isAeTokenTx = to === tokenAddress
  const gas = tx.gas ? new BigNumber(tx.gas) : null
  const gasPrice = tx.gasPrice ? new BigNumber(tx.gasPrice) : null
  const data = tx.data ? tx.data : null // data sent to contract
  const value = tx.value ? new BigNumber(tx.value) : 0 // ether sent in transaction in wei

  console.log('nonce', nonce)
  console.log('from', from)
  console.log('to', to)
  console.log('isAeTokenTx', isAeTokenTx)
  console.log('gas', gas)
  console.log('gasPrice', gasPrice)
  console.log('value', value)
  console.log('data', data)

  if (isAeTokenTx) {
    // it is a call to our token contract
    abiDecoder.addABI(aeAbi)
    const decodedData = abiDecoder.decodeMethod(data)
    if (decodedData) {
      console.log('decodedData', JSON.stringify(decodedData))
    } else {
      console.log('could not decode data')
    }
  }
}
