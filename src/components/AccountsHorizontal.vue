<template>
  <div class="accounts-horizontal">
    <div class="title">
      <h1>Account Switcher</h1>
      <div v-if="identities.length > 1">
        Total balance <span>{{ totalBalance | roundToken }} AE</span>
      </div>
    </div>
    <div class="accounts">
      <div class="active">
        <h2>Active account</h2>
        <div>
          <ae-identity
            :identity="activeIdentity"
            active>
            <ae-divider v-if="identities.length > 1" />
          </ae-identity>
        </div>
      </div>
      <div
        v-if="identities.length > 1"
        class="inactive">
        <h2>Inactive accounts</h2>
        <div>
          <ae-identity
            v-for="(identity, index) in identities"
            v-if="identity !== activeIdentity"
            :key="identity.address"
            :identity="identity"
          >
            <ae-divider />
            <ae-button
              type="dramatic"
              size="small"
              uppercase
              @click="selectIdentity(index)"
            >Activate</ae-button>
          </ae-identity>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { AeIdentity, AeButton, AeDivider } from '@aeternity/aepp-components'
import { roundToken } from '@/lib/filters'

export default {
  components: { AeIdentity, AeButton, AeDivider },
  filters: { roundToken },
  computed: mapGetters(['identities', 'activeIdentity', 'totalBalance']),
  methods: mapMutations(['selectIdentity']),
  mounted () {
    this.$store.dispatch('updateAllBalances')
  }
}
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components/dist/variables.scss';

.accounts-horizontal {
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h1 {
      font-size: 24px;
      margin: 0;
    }

    div {
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;

      span {
        font-family: 'Roboto Mono', monospace;
        font-size: 20px;
        font-weight: bold;
        color: $black;
        margin-left: 12px;
      }
    }
  }

  .accounts {
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    margin-bottom: 8px;
    align-items: center;

    &::-webkit-scrollbar {
      height: 9px;

      &-thumb {
        border-radius: 5px;
        background-color: $grey;

        &:hover {
          background-color: darken($grey, 20%);
        }
      }
    }

    h2 {
      margin: 0 0 17px 0;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 12px;
    }

    .ae-identity {
      width: 335px;

      .ae-divider {
        margin: 0 0 15px 0;
      }

      .ae-button {
        float: right;
      }
    }

    .active > div {
      margin-right: 55px;

      .ae-identity .ae-divider {
        margin-bottom: 43px;
      }
    }

    .inactive > {
      h2, div {
        padding-left: 55px;
      }

      div {
        border-left: 1px solid $silver;
        display: flex;

        .ae-identity {
          margin-right: 30px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
