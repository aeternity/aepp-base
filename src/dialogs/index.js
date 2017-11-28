import Vue from 'vue'
import ModalDialogs, { makeDialog } from 'vue-modal-dialogs'
import router from '@/router'

import Approve from '@/components/Approve.vue';

Vue.use(ModalDialogs, {
  el:'#dialog',
  wrapper: {
    props: {
      name: 'fade'
    }
  },
  wrapperComponentOptions: {
    router
  },
  zIndex:{
    value:1000
  }
});

export const approveTransaction = makeDialog(
  Approve,
  'transaction',
  'estimateGas',
  'getGasPrice',
  'appName',
  'isAeTokenTx',
  'aeTokenTx'

)
