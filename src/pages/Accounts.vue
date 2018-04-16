<template>
  <modal-page class="accounts" title="My Accounts" @close="closeHandler">
    <template v-if="identities.length > 1">
      <label class="total-balance">
        Total balance
        <span>
          <span class="ae">{{totalAmount.tokenAmount}} AE</span><br />
          {{totalAmount.amount}} ETH
        </span>
      </label>
      <ae-divider />
    </template>

    <label>Active address</label>
    <ae-identity
      class="active-account"
      active
      :identity="activeIdentity"
      size="big"
      :collapsed="false"
    />

    <template v-if="identities.length === 1">
      <p>
        This is your first Identity, it enables you to use our Æpps,
        get Tokens, trade them and much more!
      </p>
      <p>
        Quickly activate another identity or instantly create one or multiple ID’s.
        Each has it’s own address and Token Balance
      </p>
    </template>
    <template v-else>
      <ae-divider/>
      <label>
        Inactive
        <span>{{identities.length - 1}}</span>
      </label>
      <div class="inactive-accounts">
        <ae-identity
          v-for="{ identity, index, beforeActive, active } in inactiveIdentities"
          :key="identity.address"
          :active="false"
          :identity="identity"
          size="big"
          collapsed
          :class="{ 'before-active': beforeActive, active }"
          @click="activateCard(index)"
        >
          <div v-if="active" class="action-buttons">
            <ae-divider />
            <ae-button
              @click="selectIdentity(index)"
              size="small"
              type="dramatic"
              uppercase
            >
              Activate
            </ae-button>
          </div>
        </ae-identity>
      </div>
    </template>

    <fixed-add-button @click="createIdentity" />
  </modal-page>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { AeIdentity, AeButton, AeDivider, aeHelperMixin } from '@aeternity/aepp-components'
  import ModalPage from '@/components/ModalPage'
  import FixedAddButton from '@/components/FixedAddButton'

  export default {
    data: () => ({
      activeIdentityCard: -1
    }),
    components: { AeIdentity, AeButton, AeDivider, ModalPage, FixedAddButton },
    mixins: [aeHelperMixin],
    computed: {
      ...mapGetters(['identities', 'activeIdentity']),
      inactiveIdentities () {
        const activeIndex = this.activeIdentityCard
        return this.identities
          .map((identity, index) => ({ identity, index }))
          .filter(({ identity }) => identity !== this.activeIdentity)
          .map(({ identity, index }, i, identities) => ({
            identity,
            index,
            beforeActive: identities[i + 1] && identities[i + 1].index === activeIndex,
            active: index === activeIndex
          }))
      },
      totalAmount () {
        return this.identities.reduce((p, identity) => ({
          amount: p.amount + parseFloat(this.readableEther(identity.balance)),
          tokenAmount:
            p.tokenAmount + (identity.tokenBalance
              ? parseFloat(this.readableToken(identity.tokenBalance)) : 0)
        }), { amount: 0, tokenAmount: 0 })
      }
    },
    methods: {
      ...mapMutations(['selectIdentity']),
      ...mapActions(['createIdentity']),
      activateCard (i) {
        this.activeIdentityCard = i === this.activeIdentityCard ? -1 : i
      },
      closeHandler () {
        const { from } = this.$store.state.route
        const next =
          !['login', 'set-password'].includes(from.name) && from.path || { name: 'apps' }
        this.$router.push(next)
      }
    },
    mounted () {
      this.$store.dispatch('updateAllBalances')
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .accounts {
    label {
      display: flex;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      color: $anthracite;
      margin: 15px 0;
      align-items: center;

      span {
        flex-grow: 1;
        text-align: right;
      }

      &.total-balance {
        font-size: 16px;
        text-transform: capitalize;

        span {
          font-family: 'Roboto Mono', monospace;
          font-size: 12px;
          color: $black;

          .ae {
            font-weight: bold;
          }
        }
      }
    }

    p {
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
      text-align: center;
    }

    .active-account {
      margin-bottom: 22px;
    }

    .inactive-accounts {
      :not(:last-child):not(.before-active):not(.active) /deep/ .ae-identity {
        padding-bottom: 35px;
        margin-bottom: -20px;
      }

      .active {
        margin: 10px 0;
      }
    }

    .ae-identity {
      .action-buttons {
        text-align: right;

        .ae-divider {
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
