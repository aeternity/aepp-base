import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';

export default {
  props: {
    amount: { type: BigNumber, required: true },
    fee: { type: BigNumber, required: true },
    minFee: { type: BigNumber, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  data() {
    return { newFee: this.fee };
  },
  computed: mapGetters(['activeAccount']),
  methods: {
    denyHandler() {
      this.reject(new Error('Rejected by user'));
    },
    allowHandler() {
      this.resolve(this.newFee);
    },
  },
};
