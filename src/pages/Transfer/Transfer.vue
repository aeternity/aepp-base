<template>
  <modal-screen class="transfer" title="Transfer" :redirectToOnClose="{ name: 'apps' }">
    <ae-switch
      v-if="identitiesTo.length"
      v-model="transactionType"
      :default="swiperOptionsTo.initialSlide === -1 ? 'external' : 'internal'"
      :choices="[
        { value: 'internal', label: 'To own identity' },
        { value: 'external', label: 'External address' }
      ]"
    />

    <swiper
      v-if="transactionType === 'internal'"
      class="swiper-container"
      :options="swiperOptionsTo"
      not-next-tick
    >
      <swiper-slide v-for="i in identitiesTo" :key="i.address">
        <ae-identity :active="false" :identity="i" size="big" :collapsed="false" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" />
    </swiper>
    <div v-else>
      <ae-label
        :for="`${_uid}-addressTo`"
        help-type="danger"
        :help-text="errors.first('addressTo')"
      >Receiving address</ae-label>
      <ae-address-input
        :id="_uid"
        name="addressTo"
        v-model="to"
        v-validate="'required|min:42'"
        data-vv-delay="1"
        :placeholder="`0x00000 0000000 0000000\n0000000 0000000 0000000`"
      />
    </div>

    <ae-label
      :for="`${_uid}-currency`"
      help-type="danger"
      :help-text="errors.first('currency')"
    >Amount</ae-label>
    <ae-amount-input
      :id="`${_uid}-currency`"
      name="currency"
      v-model="currency"
      v-validate:amount="`required|decimal|min_value_exclusive:0|max_value:${maxAmount}`"
      data-vv-delay="1"
      placeholder="0.00"
    />
    <div class="fiat-amount">≈ {{fiatAmount}} CHF</div>

    <ae-button
      @click="send"
      type="dramatic"
      class="send-button"
      :inactive="errors.any()"
    >
      <img slot="icon" :src="require('emoji-datasource-apple/img/apple/64/1f4b8.png')" />
      Make Transaction
    </ae-button>

    <quick-id />
  </modal-screen>
</template>

<script src="./Transfer.js" />
<style lang="scss" src="./Transfer.scss" />
