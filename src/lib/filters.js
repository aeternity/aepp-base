import Web3 from 'web3'
import { round } from 'lodash'

export const formatWei = wei => round(Web3.utils.fromWei(wei), 3)
