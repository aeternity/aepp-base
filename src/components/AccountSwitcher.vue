<template>
  <div class="account-switcher">
    <list-item
    >
      <div
        slot="identicon"
        class="avatar"
      >
        ↪
      </div>
      <span slot="subtitle"> {{ totalBalance }} AE</span>
      Total Balance
    </list-item>

    <list-item
      v-for="(identity, index) in identities"
      :key="index">
      <ae-identity-avatar
        slot="identicon"
        :address="identity.address"
      />
      {{ identity.name }}
      <span slot="subtitle">{{ identity.balance }} AE</span>
      <ae-radio
        slot="right"
        :checked="index === selectedIdentityIdx"
        @change="selectIdentity(index)"
      />
    </list-item>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { AeIdentityAvatar } from '@aeternity/aepp-components'
import ListItem from './ListItem'
import AeRadio from '../components/AeRadio.vue'

export default {
  components: { ListItem, AeIdentityAvatar, AeRadio },
  computed: {
    ...mapGetters(['identities', 'totalBalance']),
    ...mapState(['selectedIdentityIdx'])
  },
  methods: mapMutations(['selectIdentity'])
}
</script>

<style lang="scss" scoped>
.account-switcher {
  .ae-identity-avatar {
    width: 32px;
    height: 32px;
  }
}
</style>
