import Vue from 'vue'
import ModalDialogs, { makeDialog } from 'vue-modal-dialogs'
import router from '@/router'

import ApproveTransaction from '@/dialogs/ApproveTransaction.vue'
import ApproveMessage from '@/dialogs/ApproveMessage.vue'

Vue.use(ModalDialogs, {
  el: '#dialog',
  wrapper: {
    props: {
      name: 'fade'
    }
  },
  wrapperComponentOptions: {
    router
  },
  zIndex: {
    value: 1000
  }
})

export const approveTransaction = makeDialog(
  ApproveTransaction,
  'transaction',
  'estimateGas',
  'getGasPrice',
  'appName',
  'isAeTokenTx',
  'aeTokenTx'
)

export const approveMessage = makeDialog(
  ApproveMessage,
  'identity',
  'message',
  'appName'
)
